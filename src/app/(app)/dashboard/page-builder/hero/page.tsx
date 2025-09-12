import { supabaseClient } from "@/lib/supabase/client";
import { SaveHero } from "./action";
import { HeroFormBuilder } from "./hero-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function Page() {
  const {
    data: { content: data },
  } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "HERO")
    .single();

  return <HeroFormBuilder data={data} onSave={SaveHero} />;
}
