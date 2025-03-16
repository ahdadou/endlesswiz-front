import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Info, Plus } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

// Add MasterCard icon component
const MasterCard = () => (
  <div className="flex">
    <div className="w-6 h-4 rounded-sm bg-[#EB001B] opacity-90"></div>
    <div className="w-6 h-4 rounded-sm bg-[#F79E1B] opacity-90 -ml-3"></div>
  </div>
);

// Add Visa icon component
const Visa = () => (
  <div className="w-10 h-6 bg-[#1434CB] rounded-sm flex items-center justify-center">
    <div className="text-white font-bold text-xs tracking-wider">VISA</div>
  </div>
);

const PayPal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#003087]"
  >
    <path d="M7 11C6.07003 11 5.44661 10.0301 5.80863 9.13978C6.47179 7.50487 8.21161 5 12 5C17 5 19 8.5 19 10.5C19 14 16 15 14 15H7.5C6.67157 15 6 14.3284 6 13.5C6 12.6716 6.67157 12 7.5 12H9" />
    <path d="M3.5 11C2.57003 11 1.94661 10.0301 2.30863 9.13978C2.97179 7.50487 4.71161 5 8.5 5" />
    <path d="M3 15.5C3 16.8807 4.11929 18 5.5 18H7.5C8.88071 18 10 19.1193 10 20.5C10 20.7761 9.77614 21 9.5 21H5C3.89543 21 3 20.1046 3 19V15.5Z" />
  </svg>
);

const SubscriptionPage = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [expiryDate, setExpiryDate] = useState("12/25");
  const [cvv, setCvv] = useState("•••");
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Mock subscription data
  const [subscription, setSubscription] = useState({
    plan: "premium",
    status: "active",
    nextBillingDate: "January 15, 2024",
    amount: "$9.99",
    interval: "monthly",
  });

  const handleAddCard = () => {
    setIsAddingCard(true);
  };

  const handleSaveCard = () => {
    // Simulate API call
    setTimeout(() => {
      setIsAddingCard(false);
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      });
    }, 1000);
  };

  const handleCancelSubscription = () => {
    // Simulate API call
    setTimeout(() => {
      setSubscription({
        ...subscription,
        status: "canceled",
        nextBillingDate: "N/A",
      });

      toast({
        title: "Subscription canceled",
        description:
          "Your subscription has been canceled. Premium features will remain active until the end of your current billing period.",
      });
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2 border-forest-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Subscription Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">
                  Premium Plan
                  <Badge className="ml-2 bg-forest text-cream">Active</Badge>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Billed {subscription.interval}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{subscription.amount}</p>
                <p className="text-sm text-muted-foreground">
                  Next billing: {subscription.nextBillingDate}
                </p>
              </div>
            </div>

            <div className="bg-forest/5 rounded-lg p-4">
              <h4 className="font-medium mb-2">Your Premium Benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Unlimited study sets</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Advanced analytics and progress tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Offline access to study materials</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-medium mb-4">Available Plans</h3>
            <RadioGroup defaultValue="premium-monthly" className="space-y-4">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="premium-monthly" id="premium-monthly" />
                <div className="flex-1">
                  <Label htmlFor="premium-monthly" className="font-medium">
                    Premium Monthly
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    $9.99 per month
                  </p>
                </div>
                <Badge>Current Plan</Badge>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="premium-annual" id="premium-annual" />
                <div className="flex-1">
                  <Label htmlFor="premium-annual" className="font-medium">
                    Premium Annual
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    $99.99 per year (Save 17%)
                  </p>
                </div>
                <Badge variant="outline">Best Value</Badge>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="free" id="free" />
                <div className="flex-1">
                  <Label htmlFor="free" className="font-medium">
                    Free Plan
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Limited features
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={handleCancelSubscription}
            disabled={subscription.status === "canceled"}
          >
            {subscription.status === "canceled"
              ? "Subscription Canceled"
              : "Cancel Subscription"}
          </Button>
          <Button className="bg-forest hover:bg-forest-700 text-cream">
            Change Plan
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="border-forest-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-forest">Payment Methods</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAddingCard ? (
              <>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-white p-2 border">
                      <MasterCard />
                    </div>
                    <div>
                      <p className="font-medium">MasterCard ending in 4242</p>
                      <p className="text-xs text-muted-foreground">
                        Expires {expiryDate}
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddCard}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <RadioGroup
                    defaultValue="credit-card"
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <Visa />
                          <MasterCard />
                        </div>
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label
                        htmlFor="paypal"
                        className="flex items-center gap-2"
                      >
                        <PayPal />
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <>
                    <div className="space-y-2">
                      <Label>Card Number</Label>
                      <div className="relative">
                        <Input placeholder="1234 5678 9012 3456" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <Visa />
                          <MasterCard />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Name on Card</Label>
                      <Input placeholder="John Doe" />
                    </div>
                  </>
                )}

                {paymentMethod === "paypal" && (
                  <>
                    <div className="rounded-lg border p-4 bg-blue-50">
                      <div className="flex items-center gap-3 mb-4">
                        <PayPal />
                        <div>
                          <p className="font-medium">Pay with PayPal</p>
                          <p className="text-xs text-muted-foreground">
                            Safe and secure payments
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>PayPal Email</Label>
                          <Input
                            type="email"
                            placeholder="your-email@example.com"
                          />
                        </div>

                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p>
                            You'll be redirected to PayPal to complete your
                            payment securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingCard(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-forest hover:bg-forest-700 text-cream"
                    onClick={handleSaveCard}
                  >
                    Save Payment Method
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-forest-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-forest">Billing History</CardTitle>
            <CardDescription>View your past invoices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Premium Monthly</p>
                <p className="text-xs text-muted-foreground">Dec 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$9.99</p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Download
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Premium Monthly</p>
                <p className="text-xs text-muted-foreground">Nov 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$9.99</p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Download
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Premium Monthly</p>
                <p className="text-xs text-muted-foreground">Oct 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$9.99</p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
