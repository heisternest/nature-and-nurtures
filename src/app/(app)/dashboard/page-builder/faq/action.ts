"use server";

import { supabaseClient } from "@/lib/supabase/client";

export async function SaveFAQ(data: any) {
  try {
    const { error } = await supabaseClient
      .from("PageContent")
      .upsert(
        [
          {
            pageType: "FAQ",
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
