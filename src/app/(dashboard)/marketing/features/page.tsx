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

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Marketing <span className="text-primary">Features</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Discover all the tools and features available to help market your
          website effectively.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard/marketing/pricing">View Pricing Plans</Link>
        </Button>
      </section>

      <section className="mb-20" id="seo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">SEO Optimization</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our comprehensive SEO tools help your website rank higher in
              search results and attract more organic traffic.
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Metadata Management</h3>
                  <p className="text-muted-foreground">
                    Easily edit page titles, descriptions, and other meta tags
                    critical for SEO.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Keyword Analysis</h3>
                  <p className="text-muted-foreground">
                    Get recommendations for high-performing keywords in your
                    industry.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Content Optimization</h3>
                  <p className="text-muted-foreground">
                    Analyze your content and get recommendations for SEO
                    improvements.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Mobile Optimization</h3>
                  <p className="text-muted-foreground">
                    Ensure your site is fully optimized for mobile devices to
                    improve search rankings.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <svg
                className="h-24 w-24 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p className="text-muted-foreground">SEO Dashboard Visual</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20" id="social">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-muted rounded-lg p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <svg
                className="h-24 w-24 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <p className="text-muted-foreground">
                Social Media Integration Visual
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">
              Social Media Integration
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Connect with your audience across all major social platforms and
              expand your online reach.
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Social Sharing</h3>
                  <p className="text-muted-foreground">
                    Add customizable sharing buttons to your website content.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Social Feeds</h3>
                  <p className="text-muted-foreground">
                    Display your social media feeds directly on your website.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    Cross-Platform Publishing
                  </h3>
                  <p className="text-muted-foreground">
                    Publish content to multiple social platforms simultaneously.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Engagement Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor likes, shares, and comments across all platforms.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-20" id="analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Gain valuable insights into your website performance with our
              comprehensive analytics tools.
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Traffic Analysis</h3>
                  <p className="text-muted-foreground">
                    Track visitor numbers, sources, and behavior on your site.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Conversion Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor form submissions, purchases, and other conversion
                    goals.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Custom Reports</h3>
                  <p className="text-muted-foreground">
                    Create tailored reports for the metrics that matter most to
                    you.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Performance Insights</h3>
                  <p className="text-muted-foreground">
                    Get actionable recommendations to improve your site's
                    performance.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <svg
                className="h-24 w-24 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" x2="18" y1="20" y2="10" />
                <line x1="12" x2="12" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="14" />
              </svg>
              <p className="text-muted-foreground">
                Analytics Dashboard Visual
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Additional Marketing Features
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>Email Marketing Integration</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">
                Connect your website with popular email marketing platforms like
                Mailchimp, ConvertKit, and more.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Easy signup form creation
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Automated email workflows
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Subscriber management
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Landing Page Tools</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">
                Create high-converting landing pages with specialized templates
                and optimization tools.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Conversion-optimized templates
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  A/B testing capabilities
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Heat mapping and user behavior analytics
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Blog & Content Management</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">
                Powerful tools for content creation, publishing, and management
                to drive organic traffic.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Rich content editor
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Content scheduling
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Category and tag management
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Local SEO Tools</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">
                Boost your local search visibility and attract customers in your
                area.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Google My Business integration
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Local keyword optimization
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Location-based content management
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Grow Your Online Presence?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Compare our pricing plans and choose the one that best fits your
          needs.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard/marketing/pricing">View Pricing Plans</Link>
        </Button>
      </section>
    </div>
  );
}
