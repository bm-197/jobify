import "server-only";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

if (!N8N_WEBHOOK_URL) {
  console.warn("N8N_WEBHOOK_URL is not set");
}

interface OnboardUserPayload {
  user_id: string;
  email: string;
  full_name: string;
  linkedin_url?: string;
  resume_text: string;
}

interface GenerateApplicationPayload {
  email: string;
  user_id: string;
  input_type: "url" | "text" | "file";
  job_description: string;
  output_format?: string;
}

export async function callOnboardUser(payload: OnboardUserPayload) {
  const res = await fetch(`${N8N_WEBHOOK_URL}/onboard-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Onboarding webhook error:", res.status, text);
    throw new Error(`Onboarding webhook failed: ${res.status}`);
  }

  if (!text) {
    // Webhook returned 200 but empty body — treat as success
    return {};
  }

  try {
    const parsed = JSON.parse(text);
    return unwrapN8nResponse(parsed);
  } catch {
    // Response might be markdown-wrapped JSON directly
    const extracted = extractJsonFromMarkdown(text);
    if (extracted) return extracted;
    console.error("Onboarding webhook returned non-JSON:", text.slice(0, 500));
    return {};
  }
}

/**
 * n8n sometimes wraps data in { status, message, data } or puts
 * Gemini output in a `text` field as a markdown code block.
 */
function unwrapN8nResponse(obj: Record<string, unknown>): Record<string, unknown> {
  // Case 1: { status, data: { ... } }
  if (obj.data && typeof obj.data === "object" && !Array.isArray(obj.data)) {
    return obj.data as Record<string, unknown>;
  }

  // Case 2: { text: "```json\n{...}\n```" }
  if (typeof obj.text === "string") {
    const extracted = extractJsonFromMarkdown(obj.text as string);
    if (extracted) return extracted;
  }

  return obj;
}

function extractJsonFromMarkdown(text: string): Record<string, unknown> | null {
  try {
    const fenceMatch = text.match(/```(?:json)?\n?([\s\S]*?)```/);
    const raw = fenceMatch ? fenceMatch[1].trim() : text.trim();
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export async function callGenerateApplication(payload: GenerateApplicationPayload) {
  const res = await fetch(`${N8N_WEBHOOK_URL}/generate-application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Generate application webhook error:", res.status, text);
    throw new Error(`Generate application webhook failed: ${res.status}`);
  }

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error("Generate webhook returned non-JSON:", text.slice(0, 500));
    return {};
  }
}
