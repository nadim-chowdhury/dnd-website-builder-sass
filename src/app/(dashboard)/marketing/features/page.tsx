import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Globe, BarChart2, Share2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center mb-24">
            <div className="inline-block bg-indigo-100 px-4 py-2 rounded-full text-indigo-600 font-medium text-sm mb-6">
              Marketing Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Powerful{" "}
              <span className="text-indigo-600">Marketing Features</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mb-10">
              Discover all the tools available to help market your website
              effectively and grow your online presence.
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 h-auto font-medium transition-all shadow-md hover:shadow-lg">
              <Link href="/marketing/pricing">View Pricing Plans</Link>
            </Button>
          </section>

          {/* SEO Section */}
          <section className="mb-32" id="seo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-amber-100 px-3 py-1 rounded-full text-amber-600 font-medium text-sm mb-4">
                  SEO Tools
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Rank Higher in Search Results
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our comprehensive SEO tools help your website attract more
                  organic traffic with data-driven optimization.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Metadata Management
                      </h3>
                      <p className="text-slate-600">
                        Easily edit page titles, descriptions, and other meta
                        tags critical for SEO.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Keyword Analysis</h3>
                      <p className="text-slate-600">
                        Get recommendations for high-performing keywords in your
                        industry.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Content Optimization
                      </h3>
                      <p className="text-slate-600">
                        Analyze your content and get recommendations for SEO
                        improvements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Mobile Optimization
                      </h3>
                      <p className="text-slate-600">
                        Ensure your site is fully optimized for mobile devices
                        to improve search rankings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-10 flex items-center justify-center shadow-md">
                <div className="relative h-64 w-64">
                  <Globe
                    className="h-full w-full text-amber-500"
                    strokeWidth={1}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <div className="w-32 h-2 bg-amber-200 rounded-full mb-2"></div>
                      <div className="w-24 h-2 bg-amber-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="mb-32" id="social">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-10 flex items-center justify-center shadow-md">
                <div className="relative h-64 w-64">
                  <Share2
                    className="h-full w-full text-teal-500"
                    strokeWidth={1}
                  />
                  <div className="absolute top-1/4 right-1/4">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <div className="w-8 h-8 bg-teal-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 left-1/4">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <div className="w-8 h-8 bg-teal-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-teal-100 px-3 py-1 rounded-full text-teal-600 font-medium text-sm mb-4">
                  Social Media
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Expand Your Online Reach
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Connect with your audience across all major social platforms
                  and build a strong online community.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Social Sharing</h3>
                      <p className="text-slate-600">
                        Add customizable sharing buttons to your website
                        content.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Social Feeds</h3>
                      <p className="text-slate-600">
                        Display your social media feeds directly on your
                        website.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Cross-Platform Publishing
                      </h3>
                      <p className="text-slate-600">
                        Publish content to multiple social platforms
                        simultaneously.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Engagement Tracking
                      </h3>
                      <p className="text-slate-600">
                        Monitor likes, shares, and comments across all
                        platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analytics Section */}
          <section className="mb-32" id="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-purple-100 px-3 py-1 rounded-full text-purple-600 font-medium text-sm mb-4">
                  Analytics
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Data-Driven Insights
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Gain valuable insights into your website performance with our
                  comprehensive analytics tools.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Traffic Analysis</h3>
                      <p className="text-slate-600">
                        Track visitor numbers, sources, and behavior on your
                        site.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Conversion Tracking
                      </h3>
                      <p className="text-slate-600">
                        Monitor form submissions, purchases, and other
                        conversion goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Custom Reports</h3>
                      <p className="text-slate-600">
                        Create tailored reports for the metrics that matter most
                        to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">
                        Performance Insights
                      </h3>
                      <p className="text-slate-600">
                        Get actionable recommendations to improve your
                        site&apos;s performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-10 flex items-center justify-center shadow-md">
                <div className="relative h-64 w-64">
                  <BarChart2
                    className="h-full w-full text-purple-500"
                    strokeWidth={1}
                  />
                  <div className="absolute bottom-0 left-1/4 w-1/2">
                    <div className="flex justify-between">
                      <div className="h-16 w-8 bg-purple-300 rounded-t-md"></div>
                      <div className="h-24 w-8 bg-purple-400 rounded-t-md"></div>
                      <div className="h-32 w-8 bg-purple-500 rounded-t-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Features Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 px-3 py-1 rounded-full text-blue-600 font-medium text-sm mb-4">
                More Features
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Additional Marketing Tools
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore our complete suite of marketing features designed to
                help your business grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="bg-rose-100 p-2 rounded-full mr-3">
                      <svg
                        className="h-5 w-5 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    Email Marketing Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Connect your website with popular email marketing platforms
                    like Mailchimp, ConvertKit, and more.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-rose-500 mr-2" />
                      Easy signup form creation
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-rose-500 mr-2" />
                      Automated email workflows
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-rose-500 mr-2" />
                      Subscriber management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                      </svg>
                    </div>
                    Landing Page Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Create high-converting landing pages with specialized
                    templates and optimization tools.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                      Conversion-optimized templates
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                      A/B testing capabilities
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                      Heat mapping and analytics
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        ></path>
                      </svg>
                    </div>
                    Blog & Content Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Powerful tools for content creation, publishing, and
                    management to drive organic traffic.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Rich content editor
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Content scheduling
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Category and tag management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <svg
                        className="h-5 w-5 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    Local SEO Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Boost your local search visibility and attract customers in
                    your area.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                      Google My Business integration
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                      Local keyword optimization
                    </li>
                    <li className="flex items-center text-slate-600">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                      Location-based content management
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 py-16 px-4 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Grow Your Online Presence?
            </h2>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
              Compare our pricing plans and choose the one that best fits your
              needs.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-8 py-6 h-auto font-medium transition-all shadow-md hover:shadow-lg">
              <Link href="/marketing/pricing">View Pricing Plans</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
