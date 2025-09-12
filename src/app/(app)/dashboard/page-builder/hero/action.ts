"use server";

import { supabaseClient } from "@/lib/supabase/client";
import { HeroData } from "./schema";

export async function SaveHero(data: HeroData) {
  try {
    const { error } = await supabaseClient
      .from("PageContent")
      .upsert(
        [
          {
            pageType: "HERO",
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
