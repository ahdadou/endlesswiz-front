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
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

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

const NotificationPage = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

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

  return (
    <div className="">
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
              <h3 className="text-lg font-medium mb-4">Study Reminders</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Study Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily reminder to study
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Streak Notifications</Label>
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
              <h3 className="text-lg font-medium mb-4">Content Updates</h3>
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
                    <Label className="text-base">Content Recommendations</Label>
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
                  <div className="col-span-1 font-medium text-center">Push</div>
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
                  <div className="col-span-1">Marketing & Promotions</div>
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
    </div>
  );
};

export default NotificationPage;
