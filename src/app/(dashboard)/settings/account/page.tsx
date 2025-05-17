"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  urls: z
    .object({
      website: z
        .string()
        .url({ message: "Please enter a valid URL." })
        .optional()
        .or(z.literal("")),
      github: z
        .string()
        .url({ message: "Please enter a valid URL." })
        .optional()
        .or(z.literal("")),
    })
    .optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    push: false,
    marketing: true,
  });

  // Profile form with default values
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "Web developer and UI/UX enthusiast",
      urls: {
        website: "https://johndoe.com",
        github: "https://github.com/johndoe",
      },
    },
    mode: "onChange",
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });

      // Reset form after successful submission
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to update password. Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setIsLoading(true);

      try {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        });

        // Redirect to home page or login
        // window.location.href = "/";
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        <Separator />

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile information and how others see you on the
              platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile picture"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change avatar
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={profileForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We&apos;ll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tell us about yourself"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Brief description for your profile. Max 160 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="urls.website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://your-website.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="urls.github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account activity.
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
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser.
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
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Marketing Emails</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features, templates, and
                    promotions.
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
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Notification preferences updated",
                  description: "Your notification preferences have been saved.",
                });
              }}
            >
              Save preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions for your account.
            </CardDescription>
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
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
