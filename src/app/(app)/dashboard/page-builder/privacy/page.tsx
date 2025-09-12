import { supabaseClient } from "@/lib/supabase/client";
import { Metadata } from "next";
import { SavePrivacy } from "./action";
import { PrivacyPolicyBuilder } from "./privacy-policy-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata: Metadata = {
  title: "Dashboard - TOS Page Builder",
  description:
    "Build and edit the Terms of Service page content in the dashboard.",
};

export default async function Page() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "PRIVACY")
    .single();
  return <PrivacyPolicyBuilder data={data} onSave={SavePrivacy} />;
}
