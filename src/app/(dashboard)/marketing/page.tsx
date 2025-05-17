import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Globe, Share2, BarChart3, ArrowRight, Check } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="bg-gradient-to-b from-violet-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center mb-24">
          <div className="mb-6 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-600 font-medium">
            Marketing Tools
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Grow Your Online{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Presence
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mb-10">
            Simple, powerful marketing tools to help you attract visitors and
            convert them into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
            >
              <Link href="/marketing/features">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-indigo-200 hover:bg-indigo-50 text-indigo-600"
            >
              <Link href="/marketing/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">SEO Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-500">
                Our built-in SEO tools help you optimize your website content
                for better search engine visibility and ranking.
              </CardContent>
              <CardFooter>
                <Link
                  href="/marketing/features#seo"
                  className="text-teal-600 inline-flex items-center hover:text-teal-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Share2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Social Integration</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-500">
                Connect your social media profiles and enable sharing
                capabilities to expand your reach across platforms.
              </CardContent>
              <CardFooter>
                <Link
                  href="/marketing/features#social"
                  className="text-pink-600 inline-flex items-center hover:text-pink-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-500">
                Monitor visitor behavior, traffic sources, and engagement
                metrics to refine your marketing strategy.
              </CardContent>
              <CardFooter>
                <Link
                  href="/marketing/features#analytics"
                  className="text-amber-600 inline-flex items-center hover:text-amber-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 font-medium">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold mb-4">
              See What Our Customers Have Achieved
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Real results from businesses that have used our marketing tools.
            </p>
          </div>

          <Tabs defaultValue="case1" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="case1"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                E-commerce
              </TabsTrigger>
              <TabsTrigger
                value="case2"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Content Creator
              </TabsTrigger>
              <TabsTrigger
                value="case3"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Portfolio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="case1" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">Fashion Boutique</h3>
                  <p className="text-gray-500 mb-6">
                    Increased sales by 150% with targeted SEO and social
                    strategies.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>200% increase in organic search traffic</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>45% higher engagement through social media</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>
                        30% conversion rate improvement with analytics
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-purple-600 mb-2 text-5xl font-bold">
                      150%
                    </div>
                    <p className="text-gray-600">Sales Increase</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="case2" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">Lifestyle Blogger</h3>
                  <p className="text-gray-500 mb-6">
                    Doubled subscriber base in just 3 months with content
                    optimization.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Top 3 search rankings for target keywords</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>75% increase in social shares per post</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>25% boost in email open rates</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-pink-600 mb-2 text-5xl font-bold">
                      2x
                    </div>
                    <p className="text-gray-600">Subscriber Growth</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="case3" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">
                    Freelance Designer
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Secured 5 major clients within one month of portfolio
                    optimization.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>60% increase in portfolio discoverability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>10x more traffic from design community sites</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Improved conversion from portfolio visits</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-teal-600 mb-2 text-5xl font-bold">
                      5
                    </div>
                    <p className="text-gray-600">Major Clients</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of businesses that have already boosted their growth
            with our marketing tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-indigo-600"
            >
              <Link href="/marketing/features">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white border-2 text-white hover:bg-white/10"
            >
              <Link href="/marketing/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
