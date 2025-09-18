import { supabaseClient } from "@/lib/supabase/client";
import { SaveInfo } from "./action";
import { InfoFormBuilder } from "./info-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata = {
  title: "Info Section | Nature and Nurtures",
  description: "Customize the Info section of your website.",
};

export default async function Page() {
  const { data } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "INFO")
    .single();

  return <InfoFormBuilder data={data?.content} onSave={SaveInfo} />;
}
