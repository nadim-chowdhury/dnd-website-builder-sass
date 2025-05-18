"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    push: false,
    marketing: true,
  });

  // Form state
  const [profile, setProfile] = useState<any>({
    username: "nadim-chowdhury",
    email: "john.doe@example.com",
    bio: "Web developer and UI/UX enthusiast",
    website: "https://johndoe.com",
    github: "https://github.com/johndoe",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle profile form changes
  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  // Handle password form changes
  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  // Submit handlers
  const handleProfileSubmit = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Profile updated successfully");
    }, 1000);
  };

  const handlePasswordSubmit = () => {
    // Validate password match
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Password updated successfully");
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert("Account deleted successfully");
      }, 1000);
    }
  };

  const saveNotificationPreferences = () => {
    // Simulate API call
    setTimeout(() => {
      alert("Notification preferences saved");
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium">Account Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/40499378?v=4"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <Button variant="outline" size="sm" className="h-8">
                  Change photo
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <Input
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  placeholder="Username"
                  className="h-10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your public display name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="email@example.com"
                  className="h-10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We&apos;ll never share your email
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <Input
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell us about yourself"
                  className="h-10"
                />
                <p className="text-xs text-gray-500 mt-1">Max 160 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Website
                  </label>
                  <Input
                    name="website"
                    value={profile.website}
                    onChange={handleProfileChange}
                    placeholder="https://example.com"
                    className="h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    GitHub
                  </label>
                  <Input
                    name="github"
                    value={profile.github}
                    onChange={handleProfileChange}
                    placeholder="https://github.com/username"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleProfileSubmit}
                  disabled={isLoading}
                  className="h-9 px-4"
                >
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  className="h-10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  className="h-10"
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={handlePasswordSubmit}
                  disabled={isLoading}
                  className="h-9 px-4"
                >
                  {isLoading ? "Updating..." : "Update password"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <p className="text-xs text-gray-500">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled.email}
                  onCheckedChange={(checked) =>
                    setNotificationsEnabled({
                      ...notificationsEnabled,
                      email: checked,
                    })
                  }
                />
              </div>

              <Separator className="my-2" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <p className="text-xs text-gray-500">
                    Receive browser notifications
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled.push}
                  onCheckedChange={(checked) =>
                    setNotificationsEnabled({
                      ...notificationsEnabled,
                      push: checked,
                    })
                  }
                />
              </div>

              <Separator className="my-2" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Marketing Emails</h3>
                  <p className="text-xs text-gray-500">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled.marketing}
                  onCheckedChange={(checked) =>
                    setNotificationsEnabled({
                      ...notificationsEnabled,
                      marketing: checked,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="outline"
              onClick={saveNotificationPreferences}
              className="h-9"
            >
              Save preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-100 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-red-500">
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white h-9"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
