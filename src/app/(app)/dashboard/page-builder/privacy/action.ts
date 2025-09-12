"use server";

import { supabaseClient } from "@/lib/supabase/client";

export async function SavePrivacy(data: any) {
  try {
    const { error } = await supabaseClient
      .from("PageContent")
      .upsert(
        [
          {
            pageType: "PRIVACY",
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
