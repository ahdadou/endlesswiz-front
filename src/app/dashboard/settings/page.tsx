// app/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  CreditCard,
  Lock,
  Bell,
  Palette,
  Shield,
  FileText,
  Settings,
} from "lucide-react";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const settingsSections = [
    {
      id: "profile",
      icon: <User className="w-5 h-5" />,
      title: "Profile Information",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
              defaultValue="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
            />
          </div>
        </div>
      ),
    },
    {
      id: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payment Methods",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span>•••• •••• •••• 4242</span>
              <Button variant="ghost" className="text-red-500">
                Remove
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Add New Card</h3>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="px-3 py-2 rounded-lg border border-gray-200"
              />
              <input
                type="text"
                placeholder="CVC"
                className="px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5" />,
      title: "Security",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="2fa" />
            <label htmlFor="2fa" className="text-sm">
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "preferences",
      icon: <Palette className="w-5 h-5" />,
      title: "Preferences",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <span>Study Reminders</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      ),
    },
    {
      id: "legal",
      icon: <FileText className="w-5 h-5" />,
      title: "Legal",
      content: (
        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            Terms of Service
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Privacy Policy
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            {/* Settings Navigation */}
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Active Section Content */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold mb-6">
                {settingsSections.find((s) => s.id === activeSection)?.title}
              </h2>
              {settingsSections.find((s) => s.id === activeSection)?.content}
              {activeSection !== "legal" && (
                <Button className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
