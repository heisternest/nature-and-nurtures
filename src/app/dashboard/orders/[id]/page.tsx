import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Edit,
  Printer,
  Truck,
} from "lucide-react";

const OrderDetails = () => {
  const deliverySteps = [
    { id: 1, label: "Processing", completed: true, icon: Check },
    { id: 2, label: "Shipped", completed: true, icon: Truck, current: true },
    { id: 3, label: "Out for Delivery", completed: false, icon: Truck },
    { id: 4, label: "Delivered", completed: false, icon: Check },
  ];

  const orderItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=80&h=80",
      quantity: 2,
      price: 25.99,
      total: 51.98,
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      image:
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=80&h=80",
      quantity: 1,
      price: 49.99,
      total: 49.99,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Order ORD-12345
              </h1>
              <p className="text-sm text-gray-500">Placed on 2025-04-15</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-gray-900">Alice Johnson</p>
                <p className="text-gray-600">alice@example.com</p>
                <p className="text-gray-600">123 Main St, Anytown, AN 12345</p>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-900">
                      Visa ending in **** 1234
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Status */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-4">
                    {deliverySteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.id}
                          className="flex flex-col items-center relative z-10"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              step.completed
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span
                            className={`text-xs mt-2 font-medium ${
                              step.completed
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Shipped
                  </Badge>
                  <span className="text-sm text-gray-600">
                    on December 23, 2024
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Items */}
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 items-center py-3"
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover bg-gray-100"
                        />
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                      <div className="col-span-2 text-center text-gray-600">
                        {item.quantity}
                      </div>
                      <div className="col-span-2 text-right text-gray-900">
                        ${item.price}
                      </div>
                      <div className="col-span-2 text-right font-medium text-gray-900">
                        ${item.total}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>$101.97</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$111.97</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
