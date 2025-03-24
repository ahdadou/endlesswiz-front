"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Moon,
  Sun,
  Check,
  X,
  Info,
  AlertTriangle,
  Save,
  CreditCardIcon,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Custom PayPal icon since it's not in Lucide
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
  >
    <path d="M7 11C6.07003 11 5.44661 10.0301 5.80863 9.13978C6.47179 7.50487 8.21161 5 12 5C17 5 19 8.5 19 10.5C19 14 16 15 14 15H7.5C6.67157 15 6 14.3284 6 13.5C6 12.6716 6.67157 12 7.5 12H9" />
    <path d="M3.5 11C2.57003 11 1.94661 10.0301 2.30863 9.13978C2.97179 7.50487 4.71161 5 8.5 5" />
    <path d="M3 15.5C3 16.8807 4.11929 18 5.5 18H7.5C8.88071 18 10 19.1193 10 20.5C10 20.7761 9.77614 21 9.5 21H5C3.89543 21 3 20.1046 3 19V15.5Z" />
  </svg>
);

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
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

  const handleSaveSettings = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-forest">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Appearance</CardTitle>
                    <CardDescription>
                      Customize how StudyCards looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Select your preferred theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-forest text-forest"
                        >
                          <Sun className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Moon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-forest to-forest-300" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Font Size</Label>
                        <p className="text-sm text-muted-foreground">
                          Adjust the text size
                        </p>
                      </div>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable or disable animations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Language & Region
                    </CardTitle>
                    <CardDescription>
                      Set your language and regional preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>App Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="cst">Central Time (CT)</SelectItem>
                          <SelectItem value="mst">
                            Mountain Time (MT)
                          </SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          <SelectItem value="utc">
                            Coordinated Universal Time (UTC)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Learning Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your learning experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Auto-Play Pronunciation
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically play word pronunciations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Hints</Label>
                        <p className="text-sm text-muted-foreground">
                          Display hints during practice sessions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Default Study Mode</Label>
                      <Select defaultValue="flashcards">
                        <SelectTrigger>
                          <SelectValue placeholder="Select study mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flashcards">Flashcards</SelectItem>
                          <SelectItem value="learn">Learn</SelectItem>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="games">Games</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Daily Study Goal</Label>
                      <Select defaultValue="15">
                        <SelectTrigger>
                          <SelectValue placeholder="Select daily goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Accessibility</CardTitle>
                    <CardDescription>
                      Adjust accessibility settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Screen Reader Support
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Optimize for screen readers
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better visibility
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Reduce Motion</Label>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations and transitions
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  className="bg-forest hover:bg-forest-700 text-cream"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="subscription">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Subscription Plan
                    </CardTitle>
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
                            <Badge className="ml-2 bg-forest text-cream">
                              Active
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Billed {subscription.interval}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            {subscription.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Next billing: {subscription.nextBillingDate}
                          </p>
                        </div>
                      </div>

                      <div className="bg-forest/5 rounded-lg p-4">
                        <h4 className="font-medium mb-2">
                          Your Premium Benefits:
                        </h4>
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
                            <span>
                              Advanced analytics and progress tracking
                            </span>
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
                      <h3 className="text-lg font-medium mb-4">
                        Available Plans
                      </h3>
                      <RadioGroup
                        defaultValue="premium-monthly"
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem
                            value="premium-monthly"
                            id="premium-monthly"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="premium-monthly"
                              className="font-medium"
                            >
                              Premium Monthly
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              $9.99 per month
                            </p>
                          </div>
                          <Badge>Current Plan</Badge>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem
                            value="premium-annual"
                            id="premium-annual"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="premium-annual"
                              className="font-medium"
                            >
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
                      <CardTitle className="text-forest">
                        Payment Methods
                      </CardTitle>
                      <CardDescription>
                        Manage your payment information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!isAddingCard ? (
                        <>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="rounded-md bg-[#0A2540] p-2 text-white">
                                <CreditCardIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Visa ending in 4242
                                </p>
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
                                <RadioGroupItem
                                  value="credit-card"
                                  id="credit-card"
                                />
                                <Label
                                  htmlFor="credit-card"
                                  className="flex items-center gap-2"
                                >
                                  <CreditCardIcon className="h-4 w-4" />
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
                                    <div className="w-8 h-5 bg-[#1A1F71] rounded"></div>
                                    <div className="w-8 h-5 bg-[#FF5F00] rounded"></div>
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
                      <CardTitle className="text-forest">
                        Billing History
                      </CardTitle>
                      <CardDescription>View your past invoices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            Dec 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$9.99</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            Nov 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$9.99</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            Oct 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$9.99</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                          >
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
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="border-forest-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-forest">
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how and when you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Study Reminders
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">
                              Daily Study Reminder
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive a daily reminder to study
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">
                              Streak Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified about your learning streak
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Goal Completion</Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications when you reach your daily goals
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Content Updates
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">New Features</Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified about new app features
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">
                              Content Recommendations
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive personalized content recommendations
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Tips & Tricks</Label>
                            <p className="text-sm text-muted-foreground">
                              Learning tips to improve your study habits
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Notification Channels
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-1 font-medium">Type</div>
                          <div className="col-span-1 font-medium text-center">
                            Email
                          </div>
                          <div className="col-span-1 font-medium text-center">
                            Push
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="col-span-1">Study Reminders</div>
                          <div className="col-span-1 flex justify-center">
                            <Switch defaultChecked />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="col-span-1">Achievement Alerts</div>
                          <div className="col-span-1 flex justify-center">
                            <Switch defaultChecked />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="col-span-1">Account Updates</div>
                          <div className="col-span-1 flex justify-center">
                            <Switch defaultChecked />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Switch />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="col-span-1">
                            Marketing & Promotions
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Switch />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-forest hover:bg-forest-700 text-cream"
                    onClick={handleSaveSettings}
                  >
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-forest hover:bg-forest-700 text-cream">
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Require a verification code when logging in
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="rounded-lg border p-4 bg-muted/20">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-forest mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">
                            Enhance your account security
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Two-factor authentication adds an additional layer
                            of security to your account by requiring access to
                            your phone in addition to your password.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">
                      Set Up Two-Factor Authentication
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Login Sessions
                    </CardTitle>
                    <CardDescription>
                      Manage your active sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start p-3 bg-forest/5 rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">
                            Chrome on Windows • New York, USA
                          </p>
                          <p className="text-xs text-muted-foreground">
                            IP: 192.168.1.1
                          </p>
                        </div>
                        <Badge>Active Now</Badge>
                      </div>

                      <div className="flex justify-between items-start p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-xs text-muted-foreground">
                            New York, USA • Last active: 2 hours ago
                          </p>
                          <p className="text-xs text-muted-foreground">
                            IP: 192.168.1.2
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4 mr-1" />
                          End
                        </Button>
                      </div>

                      <div className="flex justify-between items-start p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Firefox on macOS</p>
                          <p className="text-xs text-muted-foreground">
                            San Francisco, USA • Last active: Yesterday
                          </p>
                          <p className="text-xs text-muted-foreground">
                            IP: 192.168.1.3
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4 mr-1" />
                          End
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full text-destructive border-destructive hover:bg-destructive/10"
                    >
                      Sign Out of All Devices
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Account Activity
                    </CardTitle>
                    <CardDescription>Recent security events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Password Changed</p>
                          <p className="text-xs text-muted-foreground">
                            From Chrome on Windows • New York, USA
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Today, 10:30 AM
                        </p>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">New Login</p>
                          <p className="text-xs text-muted-foreground">
                            From Safari on iPhone • New York, USA
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Yesterday, 8:15 PM
                        </p>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Payment Method Added</p>
                          <p className="text-xs text-muted-foreground">
                            From Chrome on Windows • New York, USA
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Dec 1, 2023, 3:45 PM
                        </p>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Failed Login Attempt</p>
                            <p className="text-xs text-muted-foreground">
                              From unknown device • London, UK
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Nov 28, 2023, 2:12 AM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Full Activity Log
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
