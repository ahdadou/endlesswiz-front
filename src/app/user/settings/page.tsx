"use client";

import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "../../../components/settings/ProfileComponent";
import GeneralPage from "@/components/settings/GeneralComponent";
import SubscriptionPage from "@/components/settings/SubscriptionComponent";
import NotificationPage from "@/components/settings/NotificationComponent";
import { useUserDataZustandState, useUserDataZustandStore } from "@/provider/ZustandUserDataProvider";

export default function SettingsPage() {
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

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {/* <TabsTrigger value="general">General</TabsTrigger> */}
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
            </TabsList>

            <TabsContent value="profile">
              <ProfilePage/>
            </TabsContent>

            {/* <TabsContent value="general">
              <GeneralPage />
            </TabsContent> */}

            <TabsContent value="subscription">
              <SubscriptionPage />
            </TabsContent>

            {/* <TabsContent value="notifications">
              <NotificationPage />
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
