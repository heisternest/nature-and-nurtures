"use client";

import { supabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useRef } from "react";

export function OrderCount() {
  const [orderCount, setOrderCount] = React.useState<number | null>(null);
  const prevCountRef = useRef<number | null>(null);

  // Preload sound
  const playSound = () => {
    const audio = new Audio("/sounds/notification.mp3"); // put a file in /public/sounds/
    audio.play();
  };

  useEffect(() => {
    // load initial count
    const fetchInitialCount = async () => {
      const { count, error } = await supabaseClient
        .from("orders")
        .select("id", { count: "exact" })
        .eq("isViewed", false);

      if (error) {
        console.error("Error fetching initial order count:", error);
        return;
      }

      setOrderCount(count ?? 0);
      prevCountRef.current = count ?? 0;
    };

    fetchInitialCount();
  }, []);

  useEffect(() => {
    const channel = supabaseClient.channel("order_changes");

    const fetchCount = async () => {
      const { count, error } = await supabaseClient
        .from("orders")
        .select("id", { count: "exact" })
        .eq("isViewed", false);

      if (error) {
        console.error("Error fetching order count:", error);
        return;
      }

      // Compare with previous count
      if (
        prevCountRef.current !== null &&
        count !== null &&
        count > prevCountRef.current
      ) {
        playSound(); // 🔊 play only if new unseen orders increased
      }

      prevCountRef.current = count ?? 0;
      setOrderCount(count ?? 0);
    };

    // Trigger fetch on INSERT
    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "orders" },
      fetchCount
    );

    // Trigger fetch on UPDATE
    channel.on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "orders" },
      fetchCount
    );

    channel.subscribe();

    // Initial load
    fetchCount();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <>
      {orderCount !== null && orderCount > 0 ? (
        <div className="inline-flex items-center px-2 py-1 text-xs bg-red-600 text-white  rounded-full">
          {orderCount}
        </div>
      ) : null}
    </>
  );
}
