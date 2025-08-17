import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";

interface CartItem {
  name: string;
  image: string;
  options: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  closeDrawer: () => void;
}

const cartItems: CartItem[] = [
  {
    name: "BASIC TEE",
    image: "/p2-1-1.webp",
    options: "SIENNA / LARGE",
    price: 32.0,
    quantity: 1,
  },
  {
    name: "LEATHER TOTE BAG",
    image: "/c1.webp",
    options: "BLACK / LARGE",
    price: 32.0,
    quantity: 1,
  },
  {
    name: "NOMAD TUMBLER",
    image: "/feature-1.webp",
    options: "WHITE",
    price: 35.0,
    quantity: 1,
  },
];

export function CartDrawer({ open, closeDrawer }: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent side="right" className="p-0 w-full min-w-xl">
        <SheetHeader className="border-b">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {cartItems.map((item) => (
            <div
              key={item.name}
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
                  {/* Replace Select with your own or shadcn select if needed */}
                  <select
                    defaultValue={item.quantity}
                    className="border rounded px-2 py-1 w-16"
                  >
                    {[1, 2, 3].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button className="ml-4 text-gray-400 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-base tracking-wide">
              SUBTOTAL
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
            <button className="flex-1 bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-900 transition">
              CHECK OUT
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
