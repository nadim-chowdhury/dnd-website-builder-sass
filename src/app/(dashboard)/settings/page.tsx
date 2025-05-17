"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowUpCircle, LogOut, User } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    bio: "Web designer and developer with 5+ years of experience building responsive websites and applications.",
    avatar: "/images/avatar-placeholder.jpg",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    projectChanges: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    alert("Profile updated successfully!");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information visible to other users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          value={user.name}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={user.username}
                          onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        onChange={(e) =>
                          setUser({ ...user, bio: e.target.value })
                        }
                        rows={4}
                      />
                      <p className="text-sm text-gray-500">
                        Brief description about yourself that will be displayed
                        on your profile
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 lg:w-64">
                    <Label>Profile Picture</Label>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 border">
                        <img
                          src={user.avatar}
                          alt="Profile picture"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Button type="button" variant="outline" size="sm">
                          <ArrowUpCircle className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                        <p className="text-xs text-gray-500">
                          JPG, GIF or PNG. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-medium">User ID</h3>
                <p className="text-sm text-gray-500">user_12345abc</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Plan</h3>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                    Pro
                  </span>
                  <span className="text-sm text-gray-500">
                    Renews on May 15, 2026
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Account Created</h3>
                <p className="text-sm text-gray-500">January 15, 2023</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-gray-500">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all of your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Log Out</CardTitle>
              <CardDescription>Sign out from your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Log out from all devices and end your current session
                  </p>
                </div>
                <Button variant="outline">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-updates">Email Updates</Label>
                  <p className="text-sm text-gray-500">
                    Receive weekly digests of your website activity
                  </p>
                </div>
                <Switch
                  id="email-updates"
                  checked={notifications.emailUpdates}
                  onCheckedChange={() =>
                    handleNotificationChange("emailUpdates")
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="project-changes">Project Changes</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when someone edits your shared projects
                  </p>
                </div>
                <Switch
                  id="project-changes"
                  checked={notifications.projectChanges}
                  onCheckedChange={() =>
                    handleNotificationChange("projectChanges")
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">
                    Receive offers, promotions, and newsletter
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notifications.marketingEmails}
                  onCheckedChange={() =>
                    handleNotificationChange("marketingEmails")
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get notified about security events like sign-ins from new
                    devices
                  </p>
                </div>
                <Switch
                  id="security-alerts"
                  checked={notifications.securityAlerts}
                  onCheckedChange={() =>
                    handleNotificationChange("securityAlerts")
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your billing information and view transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 py-8 text-center">
                Please visit the Billing section to manage your payment methods
                and view your transaction history.
              </p>
              <div className="flex justify-center">
                <Button>Go to Billing</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences and account protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Change Password</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </form>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-500">
                          Chrome on macOS • San Francisco, CA
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Started 2 hours ago
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        Active
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Sign out all other sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
