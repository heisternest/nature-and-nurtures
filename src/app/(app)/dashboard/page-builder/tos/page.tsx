import { supabaseClient } from "@/lib/supabase/client";
import { Metadata } from "next";
import { SaveTos } from "./action";
import { TOSBuilder } from "./tos-builder";
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
    .eq("pageType", "TOS")
    .single();
  return <TOSBuilder data={data} saveTos={SaveTos} />;
}
