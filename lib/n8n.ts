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
    return JSON.parse(text);
  } catch {
    console.error("Onboarding webhook returned non-JSON:", text.slice(0, 500));
    return {};
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
