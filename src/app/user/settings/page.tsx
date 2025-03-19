"use client";

import type React from "react";
import ProfilePage from "../../../components/settings/ProfileComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold ">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Upgrade Banner */}
          <Card className="mb-8 overflow-hidden">
            <div className="relative forest-gradient p-6 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Level up with Endlesswiz Premium
                  </h2>
                  <p className="text-white/80 max-w-md">
                    Unlock unlimited study sets, advanced learning modes, and
                    personalized analytics to accelerate your learning journey.
                  </p>
                </div>
                <Button
                  className="bg-accent hover:bg-accent/90 text-white border-none shadow-lg"
                  size="lg"
                  onClick={() => router.push("/user/payment/upgrade")}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Upgrade now
                </Button>
              </div>
            </div>
          </Card>

          <ProfilePage />
          {/* <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfilePage/>
            </TabsContent>

            <TabsContent value="general">
              <GeneralPage />
            </TabsContent>

            <TabsContent value="subscription">
              <SubscriptionPage />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationPage />
            </TabsContent>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
}
