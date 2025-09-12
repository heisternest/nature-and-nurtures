"use server";

import { supabaseClient } from "@/lib/supabase/client";
import { TOSFormData } from "./schema";

export async function SaveTos(data: TOSFormData) {
  try {
    const { error } = await supabaseClient
      .from("PageContent")
      .upsert(
        [
          {
            pageType: "TOS",
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
