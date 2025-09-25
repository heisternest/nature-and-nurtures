import { supabaseClient } from "@/lib/supabase/client";
import { saveContact } from "./action";
import { ContactPageBuilder } from "./contact-builder";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const metadata = {
  title: "Contact Us Page Builder | Nature and Nurtures",
  description: "Customize the Contact us page of your website.",
};

export default async function Page() {
  const { data } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "CONTACT")
    .single();

  return (
    <ContactPageBuilder
      data={data ? data.content : null}
      onSave={saveContact}
    />
  );
}
