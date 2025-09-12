"use server";

import { supabaseClient } from "@/lib/supabase/client";
import { FooterFormData } from "./schema";

export async function saveFooter(data: FooterFormData) {
  try {
    const { error } = await supabaseClient
      .from("PageContent")
      .upsert(
        [
          {
            pageType: "footer",
            content: data,
          },
        ],
        {
          onConflict: "pageType",
        }
      )
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}
