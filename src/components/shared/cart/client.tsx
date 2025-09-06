"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CartDrawerProps {
  open: boolean;
  closeDrawer: () => void;
}

export function CartClientDrawer({ open, closeDrawer }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getTotalPrice();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent side="right" className="p-0 w-full min-w-xl">
        <SheetHeader className="border-b flex items-center justify-between px-8 py-4">
          <SheetTitle>Shopping Cart</SheetTitle>
          <span className="text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-8 py-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg bg-[#f8f5f2] mr-6"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-base tracking-wide">
                      {item.name}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {item.options}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-semibold text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <select
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-16"
                  >
                    {[1, 2, 3].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button
                    className="ml-4 text-gray-400 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="border-t px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-base tracking-wide">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
            <span className="font-semibold text-lg">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="text-gray-500 text-sm mb-6">
            SHIPPING AND TAXES CALCULATED AT CHECKOUT.
          </div>
          <div className="flex space-x-4 mb-4">
            <button className="flex-1 border border-gray-900 rounded-full py-3 font-semibold text-gray-900 hover:bg-gray-100 transition">
              VIEW CART
            </button>
            <button
              className="flex-1 bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
            >
              {isLoading ? "PROCESSING..." : "CHECK OUT"}
            </button>
          </div>
          <div className="text-center text-gray-500 text-sm">
            OR <span className="font-semibold">CONTINUE SHOPPING</span>{" "}
            <span className="text-black">→</span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
