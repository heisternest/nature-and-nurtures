import { supabaseClient } from "@/lib/supabase/client";
import { Metadata } from "next";
import { saveFooter } from "./action";
import { FooterForm } from "./footer-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata: Metadata = {
  title: "Dashboard - Footer Page Builder",
  description: "Manage and edit footer social media links in the dashboard.",
};

export default async function Page() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "footer")
    .single();
  return <FooterForm data={data} onsave={saveFooter} />;
}
