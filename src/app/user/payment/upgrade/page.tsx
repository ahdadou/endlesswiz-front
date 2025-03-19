"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import api from "@/clients/api/api";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";
import { useToast } from "@/hooks/use-toast";

interface SelectedPlan {
  selectedPlan: "annual" | "monthly";
  price: number;
  discount: number;
  variantId: string;
  productId: string;
}

const plans: SelectedPlan[] = [
  {
    selectedPlan: "monthly",
    price: 3.99,
    discount: 0,
    variantId: "731026",
    productId: "472040",
  },
  {
    selectedPlan: "annual",
    price: 35.99,
    discount: 0,
    variantId: "731056",
    productId: "472063",
  },
];

export default function UpgradePage() {
  const router = useRouter();
  const { userData } = useUserDataZustandState();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">(
    "annual",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the current plan details
  const currentPlan =
    plans.find((plan) => plan.selectedPlan === selectedPlan) || plans[1];

  // Calculate monthly equivalent for annual plan
  const monthlyEquivalent = (currentPlan.price / 12).toFixed(2);

  // Calculate savings percentage for annual plan compared to monthly
  const annualSavings = Math.round(
    100 - (plans[1].price / (plans[0].price * 12)) * 100,
  );

  const handleStartCheckout = () => {
    setIsProcessing(true);
    if (userData?.email === undefined) {
      setIsProcessing(false);
      router.push("/auth/login");
      return;
    }

    api
      .lemonSqueezyCheckout({
        customerEmail: userData?.email,
        variantId: currentPlan.variantId,
      })
      .then((res) => {
        window.location.href = res.checkoutUrl;
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-primary/10"
          onClick={() => router.push("/user/settings")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upgrade to StudyCards Premium
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited study sets, advanced learning tools, and accelerate
            your learning journey
          </p>
        </div>

        <Card className="mb-8 overflow-hidden border-accent/20">
          <div className="relative forest-gradient p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2" />
                Premium Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Unlimited study sets and flashcards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Advanced learning modes (Hangman, Puzzle, Test)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Personalized study analytics and insights</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Ad-free learning experience</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Priority customer support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Offline access to study materials</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Choose your plan</h2>

            <RadioGroup
              value={selectedPlan}
              onValueChange={(value) =>
                setSelectedPlan(value as "annual" | "monthly")
              }
              className="space-y-4"
            >
              <div
                className={`border rounded-lg p-6 ${
                  selectedPlan === "annual"
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem value="annual" id="annual" className="mt-1" />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <Label htmlFor="annual" className="text-xl font-medium">
                        Annual Plan
                      </Label>
                      <Badge className="bg-accent text-white font-bold">
                        Best Value
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      ${plans[1].price}/year
                    </p>
                    <p className="text-muted-foreground">
                      that's like ${monthlyEquivalent} a month
                    </p>
                    <p className="text-sm mt-2 text-accent">
                      Save {annualSavings}% compared to monthly
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-6 ${
                  selectedPlan === "monthly"
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <Label htmlFor="monthly" className="text-xl font-medium">
                      Monthly Plan
                    </Label>
                    <p className="text-2xl font-bold mt-2">
                      ${plans[0].price}/month
                    </p>
                    <p className="text-muted-foreground">billed monthly</p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">
                All plans include:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  Cancel anytime
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  All premium features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  Money-back guarantee
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order summary</h2>

              <div className="border rounded-lg p-6 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {selectedPlan === "annual" ? "Annual Plan" : "Monthly Plan"}
                  </span>
                  <span className="font-medium">${currentPlan.price}</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-2">
                  <span className="font-medium">Total due today</span>
                  <span className="font-bold text-lg">
                    ${currentPlan.price}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    {selectedPlan === "annual"
                      ? "You'll be billed annually"
                      : "You'll be billed monthly"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
              onClick={handleStartCheckout}
              disabled={isProcessing}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Upgrade Now
            </Button>

            <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
              <CreditCard className="h-3 w-3 mr-1" />
              <span>Secure payment via Lemon Squeezy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
