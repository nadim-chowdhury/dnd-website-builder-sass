// import { useState } from "react";

export default function Home() {
  // const [email, setEmail] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle email submission logic here
  //   alert(`Thank you for your interest! We'll notify ${email} when we launch.`);
  //   setEmail("");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  DragBuild
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  href="#features"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Testimonials
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign up for free
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Build websites with </span>
                  <span className="block text-indigo-600 xl:inline">
                    no-code drag & drop
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create professional websites in minutes, not days. Our
                  drag-and-drop builder makes it easy for anyone to design
                  stunning, responsive websites without writing a single line of
                  code.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Watch demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-indigo-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="w-full max-w-lg p-4">
              <div className="border-2 border-indigo-500 border-dashed rounded-lg p-4 bg-white shadow-lg">
                <div className="bg-gray-100 h-40 mb-4 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Drag image here</p>
                </div>
                <div className="flex space-x-2 mb-4">
                  <div className="h-8 bg-indigo-200 rounded flex-1"></div>
                  <div className="h-8 bg-indigo-300 rounded w-20"></div>
                </div>
                <div className="h-16 bg-gray-100 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-indigo-100 rounded"></div>
                  <div className="h-10 bg-indigo-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to build amazing websites
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools you need to create
              professional websites without any coding knowledge.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Drag and Drop Interface
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Simply drag elements onto your page and arrange them however
                    you like. No coding required.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Responsive Design
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    All websites created with our builder automatically look
                    great on mobile, tablet, and desktop.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Customizable Templates
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Start with one of our professionally designed templates and
                    customize it to match your brand.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Fast Performance
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Websites built with our platform are optimized for speed and
                    performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Create your website in three simple steps
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 text-2xl font-bold mx-auto">
                  1
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Choose a template
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Select from dozens of professionally designed templates for
                  any type of website.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 text-2xl font-bold mx-auto">
                  2
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Customize your design
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Use our drag-and-drop editor to add your content, change
                  colors, fonts, and layout.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 text-2xl font-bold mx-auto">
                  3
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  Publish your website
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  With one click, publish your website to your custom domain or
                  our hosting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div id="demo" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Watch Demo
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              See our builder in action
            </p>
          </div>
          <div className="mt-10 mx-auto max-w-4xl">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="h-16 w-16 text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-500">
              Click to watch our 2-minute demo video
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Choose the plan that's right for you. All plans include a 14-day
              free trial.
            </p>
          </div>

          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $12
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  Perfect for small personal websites.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">1 website</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Free custom domain
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">5 GB storage</p>
                  </li>
                </ul>
              </div>
              <a
                href="#"
                className="mt-8 block w-full bg-indigo-50 border border-indigo-800 rounded-md py-2 text-sm font-semibold text-indigo-600 text-center hover:bg-indigo-100"
              >
                Start free trial
              </a>
            </div>

            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="absolute top-0 p-2 transform -translate-y-1/2 bg-indigo-600 rounded-full">
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  Most popular
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Professional
                </h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $29
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  For businesses and professional sites.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">10 websites</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Free custom domain
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      20 GB storage
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      E-commerce features
                    </p>
                  </li>
                </ul>
              </div>
              <a
                href="#"
                className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
              >
                Start free trial
              </a>
            </div>

            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Enterprise
                </h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $99
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">
                  For large businesses and organizations.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Unlimited websites
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Free custom domains
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      100 GB storage
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Advanced analytics
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">
                      Dedicated support
                    </p>
                  </li>
                </ul>
              </div>
              <a
                href="#"
                className="mt-8 block w-full bg-indigo-50 border border-indigo-800 rounded-md py-2 text-sm font-semibold text-indigo-600 text-center hover:bg-indigo-100"
              >
                Start free trial
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-16 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </p>
          </div>

          <div className="mt-16">
            <div className="max-w-3xl mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Sarah Johnson
                      </h3>
                      <p className="text-sm text-gray-500">
                        Small Business Owner
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-500">
                    "DragBuild made it so easy to create a professional website
                    for my business. I was able to launch in just a few hours
                    without any technical knowledge."
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        David Chen
                      </h3>
                      <p className="text-sm text-gray-500">Freelancer</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-500">
                    "The templates are beautiful and the drag-and-drop editor is
                    so intuitive. I've recommended DragBuild to all my clients."
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Emily Rodriguez
                      </h3>
                      <p className="text-sm text-gray-500">
                        Marketing Director
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-500">
                    "We needed to launch our campaign site quickly, and
                    DragBuild delivered. The responsive design works perfectly
                    on all devices."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">
              Join thousands of satisfied customers today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Stay updated with our latest features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Subscribe to our newsletter to get the latest updates and features
              delivered straight to your inbox.
            </p>
            <div className="mt-8">
              <form onSubmit={handleSubmit} className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-2xl font-bold text-white">DragBuild</span>
              <p className="text-gray-300 text-base">
                Making website creation accessible to everyone. No coding
                required.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Product
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Templates
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Tutorials
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Community
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Press
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 DragBuild, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
