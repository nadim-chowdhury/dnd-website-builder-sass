"use client";

import { useState } from "react";
import {
  ArrowUpCircle,
  LogOut,
  User,
  Bell,
  CreditCard,
  Settings,
  Shield,
  Lock,
  Mail,
  Edit,
  Camera,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "Nadim Chowdhury",
    email: "nadim-chowdhury@outlook.com",
    username: "nadim-chowdhury",
    bio: "Web designer and developer with 5+ years of experience building responsive websites and applications.",
    avatar: "https://avatars.githubusercontent.com/u/40499378?v=4",
  });

  const [notifications, setNotifications] = useState<any>({
    emailUpdates: true,
    projectChanges: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleProfileUpdate = (e: any) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    alert("Profile updated successfully!");
  };

  const handleNotificationChange = (key: any) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-blue-50 p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-md">
                    <Image
                      src={user.avatar}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <h3 className="font-bold mt-4 text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>

              <nav className="space-y-1">
                <TabButton
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                  icon={<User size={18} />}
                  text="Profile"
                />
                <TabButton
                  active={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                  icon={<Settings size={18} />}
                  text="Account"
                />
                <TabButton
                  active={activeTab === "notifications"}
                  onClick={() => setActiveTab("notifications")}
                  icon={<Bell size={18} />}
                  text="Notifications"
                />
                <TabButton
                  active={activeTab === "billing"}
                  onClick={() => setActiveTab("billing")}
                  icon={<CreditCard size={18} />}
                  text="Billing"
                />
                <TabButton
                  active={activeTab === "security"}
                  onClick={() => setActiveTab("security")}
                  icon={<Shield size={18} />}
                  text="Security"
                />

                <div className="flex items-center gap-2 mt-6">
                  <Link href="/settings/account">
                    <Button className="bg-gray-300 hover:bg-gray-200 cursor-pointer">
                      Account
                    </Button>
                  </Link>

                  <Link href="/settings/appearance">
                    <Button className="bg-gray-300 hover:bg-gray-200 cursor-pointer">
                      Appearance
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Profile Information
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Update your personal information
                  </p>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={user.name}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          />
                          <Edit
                            size={16}
                            className="absolute right-3 top-3 text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={user.username}
                            onChange={(e) =>
                              setUser({ ...user, username: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          />
                          <Edit
                            size={16}
                            className="absolute right-3 top-3 text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <Mail
                          size={16}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        value={user.bio}
                        onChange={(e) =>
                          setUser({ ...user, bio: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Brief description about yourself that will be displayed
                        on your profile
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Account Settings
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Manage your account information
                  </p>

                  <div className="space-y-8">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800">
                          Account Info
                        </h3>
                        <span className="bg-blue-600 text-white text-xs py-1 px-3 rounded-full">
                          Pro
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">User ID</p>
                          <p className="font-medium">user_12345abc</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Account Created
                          </p>
                          <p className="font-medium">January 15, 2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Plan Renewal</p>
                          <p className="font-medium">May 15, 2026</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">
                            Log Out
                          </h3>
                          <p className="text-sm text-gray-500">
                            Sign out from all devices
                          </p>
                        </div>
                        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                          <LogOut size={16} className="mr-2" />
                          Log Out
                        </button>
                      </div>
                    </div>

                    <div className="border border-red-100 rounded-xl p-6 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-red-600 mb-1">
                            Delete Account
                          </h3>
                          <p className="text-sm text-red-500">
                            Permanently delete your account
                          </p>
                        </div>
                        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Notification Settings
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Control how you receive notifications
                  </p>

                  <div className="space-y-6">
                    <NotificationToggle
                      title="Email Updates"
                      description="Receive weekly digests of your website activity"
                      isChecked={notifications.emailUpdates}
                      onChange={() => handleNotificationChange("emailUpdates")}
                    />

                    <div className="border-t border-gray-100 pt-6"></div>

                    <NotificationToggle
                      title="Project Changes"
                      description="Get notified when someone edits your shared projects"
                      isChecked={notifications.projectChanges}
                      onChange={() =>
                        handleNotificationChange("projectChanges")
                      }
                    />

                    <div className="border-t border-gray-100 pt-6"></div>

                    <NotificationToggle
                      title="Marketing Emails"
                      description="Receive offers, promotions, and newsletter"
                      isChecked={notifications.marketingEmails}
                      onChange={() =>
                        handleNotificationChange("marketingEmails")
                      }
                    />

                    <div className="border-t border-gray-100 pt-6"></div>

                    <NotificationToggle
                      title="Security Alerts"
                      description="Get notified about security events like sign-ins from new devices"
                      isChecked={notifications.securityAlerts}
                      onChange={() =>
                        handleNotificationChange("securityAlerts")
                      }
                    />
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Billing Information
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Manage your payment methods and history
                  </p>

                  <div className="bg-blue-50 rounded-xl p-8 text-center">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <CreditCard size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Manage Your Payments
                    </h3>
                    <p className="text-gray-500 mb-4">
                      View your transaction history and update payment methods
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Go to Billing
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Security Settings
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Protect your account and data
                  </p>

                  <div className="space-y-8">
                    <div className="bg-white border border-gray-100 rounded-xl p-6">
                      <h3 className="font-medium text-gray-800 mb-4">
                        Change Password
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                            <Lock
                              size={16}
                              className="absolute right-3 top-3 text-gray-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                            <Lock
                              size={16}
                              className="absolute right-3 top-3 text-gray-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                            <Lock
                              size={16}
                              className="absolute right-3 top-3 text-gray-400"
                            />
                          </div>
                        </div>

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          Update Password
                        </button>
                      </form>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security
                          </p>
                        </div>
                        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-6">
                      <h3 className="font-medium text-gray-800 mb-4">
                        Active Sessions
                      </h3>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">
                              Current Session
                            </p>
                            <p className="text-sm text-gray-500">
                              Chrome on macOS • San Francisco, CA
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Started 2 hours ago
                            </p>
                          </div>
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center">
                            Active
                          </span>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800 transition">
                        Sign out all other sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, text }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-2.5 rounded-lg text-left transition ${
        active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}

function NotificationToggle({ title, description, isChecked, onChange }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`w-11 h-6 rounded-full peer ${
            isChecked ? "bg-blue-600" : "bg-gray-200"
          } peer-focus:ring-2 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
            isChecked ? "after:translate-x-full" : ""
          }`}
        ></div>
      </label>
    </div>
  );
}
