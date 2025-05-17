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
import Link from "next/link";
import Image from "next/image";

export default function MarketingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Market Your Website <span className="text-primary">Effectively</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Use our marketing tools to promote your website, attract visitors, and
          grow your online presence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard/marketing/features">Explore Features</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/marketing/pricing">View Pricing</Link>
          </Button>
        </div>
      </section>

      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
              <CardDescription>
                Improve your search engine rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                <svg
                  className="h-16 w-16 text-muted-foreground"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Our built-in SEO tools help you optimize your website content
                for better search engine visibility.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/marketing/features#seo">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Integration</CardTitle>
              <CardDescription>Connect with your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                <svg
                  className="h-16 w-16 text-muted-foreground"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Easily integrate social media profiles and sharing capabilities
                to expand your reach.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/marketing/features#social">
                  Learn More
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Track your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                <svg
                  className="h-16 w-16 text-muted-foreground"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" x2="18" y1="20" y2="10" />
                  <line x1="12" x2="12" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="14" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor visitor behavior, traffic sources, and engagement
                metrics to optimize your strategy.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/marketing/features#analytics">
                  Learn More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Marketing Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our customers have used our marketing tools to achieve their
            goals.
          </p>
        </div>

        <Tabs defaultValue="case1" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="case1">E-commerce</TabsTrigger>
            <TabsTrigger value="case2">Blog</TabsTrigger>
            <TabsTrigger value="case3">Portfolio</TabsTrigger>
          </TabsList>
          <TabsContent value="case1" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">Online Boutique</h3>
                <p className="text-muted-foreground mb-4">
                  A small fashion boutique increased online sales by 150% using
                  our marketing tools.
                </p>
                <ul className="space-y-2">
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
                    SEO optimization increased organic traffic by 200%
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
                    Social media integration expanded customer reach
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
                    Analytics helped optimize product listings
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Case Study Image</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="case2" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">Lifestyle Blog</h3>
                <p className="text-muted-foreground mb-4">
                  A lifestyle blogger doubled their subscriber base in just 3
                  months.
                </p>
                <ul className="space-y-2">
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
                    Content optimization improved search rankings
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
                    Social sharing boosted content visibility
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
                    Email campaign integration increased retention
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Case Study Image</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="case3" className="mt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">Freelance Designer</h3>
                <p className="text-muted-foreground mb-4">
                  A graphic designer attracted 5 major clients within the first
                  month of optimizing their portfolio site.
                </p>
                <ul className="space-y-2">
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
                    Portfolio optimization made work discoverable
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
                    Industry-specific SEO increased visibility
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
                    Analytics guided portfolio improvements
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Case Study Image</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Boost Your Online Presence?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore our marketing features or check out our pricing plans to get
          started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard/marketing/features">View All Features</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/marketing/pricing">See Pricing Plans</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
