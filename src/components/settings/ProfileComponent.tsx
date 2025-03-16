import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";
import { AlertTriangle, Camera, Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import api from "@/clients/api/api";

const ProfilePage = () => {
  const { toast } = useToast();
  const { userData } = useUserDataZustandState();

  const [profileImage, setProfileImage] = useState<string | null>(
    userData?.profileImageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(userData?.firstName || "");
  const [bio, setBio] = useState(userData?.bio || "");

  // Change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordIsloading, setChangePasswordIsloading] = useState(false);
  const [error, setError] = useState("");
  const isFormValid =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmNewPassword.trim() !== "";

  useEffect(() => {
    setProfileImage(userData?.profileImageUrl || null);
    setName(userData?.firstName || "");
    setBio(userData?.bio || "");
  }, [userData]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      api
        .uploadUserImage(e.target.files[0])
        .then((res) => {
          setProfileImage(res);
          toast({
            title: "Profile picture changed",
            description: "Your profile picture has been changed.",
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "An error occurred while uploading the image.",
          });
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  const handleRemoveProfileImage = () => {
    api
      .deleteUserProfile()
      .then(() => {
        setProfileImage(null);
        toast({
          title: "Profile picture deleted",
          description: "Your profile picture has been deleted.",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "An error occurred while deleted the image.",
        });
      });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    api
      .updateUserProfile({
        firstname: name,
        bio,
      })
      .then((res) => {
        toast({
          title: "Profile updated",
          description:
            "Your profile information has been successfully updated.",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "An error occurred while updating your",
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid) {
      setError("New password and confirm password do not match.");
      return; // Prevent submission if form is invalid
    }
    setChangePasswordIsloading(true); // Show loading spinner
    setError(""); // Clear any previous errors
    api
      .changePassword({
        currentPassword,
        newPassword,
        confirmationPassword: confirmNewPassword,
      })
      .then((res) => {
        toast({
          title: "Profile updated",
          description: "Your password has been successfully updated.",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "An error occurred while updating your",
        });
      })
      .finally(() => {
        setChangePasswordIsloading(false); // Hide loading spinner
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                {userData?.firstName?.charAt(0)}
                {userData?.firstName?.charAt(1)}
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
              <span className="text-sm text-muted-foreground">
                Uploading...
              </span>
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
              <p className="text-sm text-muted-foreground mb-2">
                Upload a new photo
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF, max 2MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card className="md:col-span-1 border-forest-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
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

      <Card className="border-forest-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={changePasswordIsloading} // Disable input while loading
            />
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError(""); // Clear error when user starts typing
              }}
              disabled={changePasswordIsloading} // Disable input while loading
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                setError(""); // Clear error when user starts typing
              }}
              disabled={changePasswordIsloading} // Disable input while loading
            />
          </div>

          {/* Display error message if passwords don't match */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button
            className="bg-forest hover:bg-forest-700 text-cream"
            onClick={handleSubmit}
            disabled={!isFormValid || changePasswordIsloading} // Disable button if form is invalid or loading
          >
            {changePasswordIsloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                {/* Loading spinner */}
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-forest-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Account Activity</CardTitle>
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
              <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
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
  );
};

export default ProfilePage;
