"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    bio: "Language enthusiast and lifelong learner. I'm passionate about mastering new languages and helping others on their learning journey.",
    birthDate: "1990-05-15",
    language: "English",
    occupation: "Software Engineer",
    education: "Master's in Computer Science",
    interests: ["Languages", "Technology", "Travel", "Reading"],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      // Simulate upload delay
      setTimeout(() => {
        const file = e.target.files![0]
        const reader = new FileReader()

        reader.onload = (event) => {
          setProfileImage(event.target?.result as string)
          setIsUploading(false)
        }

        reader.readAsDataURL(file)
      }, 1500)
    }
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      })
    }, 1000)
  }

  const handleRemoveProfileImage = () => {
    setProfileImage(null)
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-forest">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and account settings</p>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Picture Card */}
                <Card className="md:col-span-1 border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Profile Picture</CardTitle>
                    <CardDescription>Update your profile photo</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={profileImage || "/placeholder.svg"} />
                        <AvatarFallback className="text-3xl bg-forest text-cream">
                          {userData.firstName.charAt(0)}
                          {userData.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2">
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="rounded-full bg-forest p-2 text-white shadow-sm">
                            <Camera className="h-4 w-4" />
                          </div>
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImageChange}
                          />
                        </label>
                      </div>
                    </div>

                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-forest border-r-transparent"></div>
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      </div>
                    ) : profileImage ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                        onClick={handleRemoveProfileImage}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Photo
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Upload a new photo</p>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF, max 2MB</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Personal Information Card */}
                <Card className="md:col-span-2 border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={userData.address} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Birth Date</Label>
                      <Input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={userData.bio} onChange={handleInputChange} rows={4} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="bg-forest hover:bg-forest-700 text-cream"
                      onClick={handleSaveProfile}
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
                  </CardFooter>
                </Card>

                {/* Additional Information Card */}
                <Card className="md:col-span-3 border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Additional Information</CardTitle>
                    <CardDescription>Tell us more about yourself</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Native Language</Label>
                        <Input id="language" name="language" value={userData.language} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          value={userData.occupation}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input
                          id="education"
                          name="education"
                          value={userData.education}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Interests</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-forest bg-forest-100">
                            {interest}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-6">
                          + Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="bg-forest hover:bg-forest-700 text-cream"
                      onClick={handleSaveProfile}
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
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="account">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Account Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-forest hover:bg-forest-700 text-cream">Update Password</Button>
                  </CardFooter>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Connected Accounts</CardTitle>
                    <CardDescription>Manage your connected social accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#4267B2] p-2 text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#1DA1F2] p-2 text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 5.89c-.8.36-1.66.6-2.56.71.92-.55 1.62-1.43 1.95-2.47-.86.51-1.82.88-2.83 1.08A4.44 4.44 0 0 0 15.85 4c-2.46 0-4.45 2-4.45 4.46 0 .35.04.69.12 1.02-3.7-.19-6.98-1.96-9.18-4.66-.38.66-.6 1.43-.6 2.25 0 1.55.79 2.91 1.98 3.71-.73-.02-1.42-.22-2.02-.56v.06c0 2.16 1.54 3.96 3.58 4.37-.37.1-.77.15-1.17.15-.29 0-.57-.03-.84-.08.57 1.77 2.21 3.06 4.15 3.1-1.52 1.19-3.44 1.9-5.52 1.9-.36 0-.71-.02-1.06-.06 1.97 1.26 4.3 2 6.8 2 8.17 0 12.63-6.77 12.63-12.63 0-.19 0-.38-.01-.57.87-.63 1.62-1.41 2.21-2.3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Twitter</p>
                          <p className="text-xs text-muted-foreground">Connected as @johndoe</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                      >
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#0A66C2] p-2 text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#EA4335] p-2 text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432l-3.367-1.97.813-1.383 2.715 1.588 2.646-4.501 1.379.811-3.186 5.455z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-xs text-muted-foreground">Connected as john.doe@gmail.com</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Account Activity</CardTitle>
                    <CardDescription>Recent logins and activity on your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Login from New York, USA</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Login from San Francisco, USA</p>
                          <p className="text-xs text-muted-foreground">Safari on macOS • IP: 192.168.1.2</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Yesterday, 8:15 PM</p>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Password Changed</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Dec 1, 2023, 3:45 PM</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border border-destructive/50 p-4">
                      <h3 className="font-medium text-destructive mb-2">Delete Account</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back. All your data will be permanently removed.
                      </p>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>

                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Export Data</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Download a copy of all your data including profile information, sets, and learning history.
                      </p>
                      <Button variant="outline" size="sm">
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Notification Preferences</CardTitle>
                    <CardDescription>Manage how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Daily Study Reminders</p>
                        <p className="text-sm text-muted-foreground">Receive daily reminders to study</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Content Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified when new content is available</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievement Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for achievements and milestones
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates and newsletters via email</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">Learning Preferences</CardTitle>
                    <CardDescription>Customize your learning experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audio Pronunciation</p>
                        <p className="text-sm text-muted-foreground">Automatically play audio pronunciation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Use dark theme for studying at night</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Hints</p>
                        <p className="text-sm text-muted-foreground">Display hints during practice sessions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Default Study Mode</Label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>Flashcards</option>
                        <option>Learn</option>
                        <option>Test</option>
                        <option>Games</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Daily Study Goal</Label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>10 minutes</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-forest hover:bg-forest-700 text-cream">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

