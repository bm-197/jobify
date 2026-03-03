import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        const { data: profile } = await supabase
          .from("applicant_profiles")
          .select("onboarding_completed")
          .eq("email", user.email)
          .single();

        if (profile?.onboarding_completed) {
          return NextResponse.redirect(`${origin}/dashboard`);
        }
        return NextResponse.redirect(`${origin}/onboarding`);
      }

      return NextResponse.redirect(`${origin}/onboarding`);
    }
  }

  return NextResponse.redirect(
    `${origin}/auth/error?error=Could not authenticate with Google`
  );
}
