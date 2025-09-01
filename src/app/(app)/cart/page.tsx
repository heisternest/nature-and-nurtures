import { CartClientDrawer } from "@/components/shared/cart/client";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="max-w-4xl mx-auto">
        <CartClientDrawer open={true} closeDrawer={() => {}} />
      </div>
    </div>
  );
}
