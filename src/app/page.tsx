"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  ChevronDown,
  Code,
  Cpu,
  DollarSign,
  Grid,
  Layout,
  LayoutGrid,
  Layers,
  Lock,
  Monitor,
  Play,
  Shield,
  ShieldCheck,
  Sliders,
  Smartphone,
  Zap,
} from "lucide-react";
import Footer from "@/components/home/Footer";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update nav transparency
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll
      const sections = [
        "hero",
        "features",
        "how-it-works",
        "demo",
        "pricing",
        "testimonials",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle email submission logic here
    alert(`Thank you for your interest! We'll notify ${email} when we launch.`);
    setEmail("");
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                className="flex-shrink-0 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl font-bold text-indigo-600 uppercase">
                  DragBuild
                </span>
              </motion.div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {["features", "how-it-works", "pricing", "testimonials"].map(
                  (section) => (
                    <Link
                      key={section}
                      href={`#${section}`}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium 
                    ${activeSection === section ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
                      onClick={() => setActiveSection(section)}
                    >
                      {section
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="flex items-center">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    Sign up for free <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div id="hero" className="relative pt-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <motion.main
              className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  variants={fadeIn}
                >
                  <span className="block xl:inline">Build websites with </span>
                  <motion.span
                    className="block text-indigo-600 xl:inline"
                    animate={{ color: ["#4F46E5", "#6366F1", "#4F46E5"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    no-code drag & drop
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  variants={fadeIn}
                >
                  Create professional websites in minutes, not days. Our
                  drag-and-drop builder makes it easy for anyone to design
                  stunning, responsive websites without writing a single line of
                  code.
                </motion.p>
                <motion.div
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  variants={staggerChildren}
                >
                  <motion.div
                    className="rounded-md shadow"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </motion.div>
                  <motion.div
                    className="mt-3 sm:mt-0 sm:ml-3"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="#demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      <Play className="mr-2 h-4 w-4" /> Watch demo
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.main>
          </div>
        </div>
        <motion.div
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="h-56 w-full bg-indigo-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <motion.div
              className="w-full max-w-lg p-4"
              animate={pulseAnimation}
            >
              <div className="border-2 border-indigo-500 border-dashed rounded-lg p-4 bg-white shadow-lg">
                <div className="bg-gray-100 h-40 mb-4 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm flex items-center">
                    <Layout className="mr-2 h-4 w-4" /> Drag image here
                  </p>
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
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="lg:text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
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
          </motion.div>

          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: <LayoutGrid className="h-6 w-6" />,
                  title: "Drag and Drop Interface",
                  description:
                    "Simply drag elements onto your page and arrange them however you like. No coding required.",
                },
                {
                  icon: <Smartphone className="h-6 w-6" />,
                  title: "Responsive Design",
                  description:
                    "All websites created with our builder automatically look great on mobile, tablet, and desktop.",
                },
                {
                  icon: <Layers className="h-6 w-6" />,
                  title: "Customizable Templates",
                  description:
                    "Start with one of our professionally designed templates and customize it to match your brand.",
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Fast Performance",
                  description:
                    "Websites built with our platform are optimized for speed and performance.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Create your website in three simple steps
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  step: 1,
                  title: "Choose a template",
                  description:
                    "Select from dozens of professionally designed templates for any type of website.",
                },
                {
                  step: 2,
                  title: "Customize your design",
                  description:
                    "Use our drag-and-drop editor to add your content, change colors, fonts, and layout.",
                },
                {
                  step: 3,
                  title: "Publish your website",
                  description:
                    "With one click, publish your website to your custom domain or our hosting.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 text-2xl font-bold mx-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div id="demo" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Watch Demo
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              See our builder in action
            </p>
          </motion.div>
          <motion.div
            className="mt-10 mx-auto max-w-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="aspect-w-16 aspect-h-9 h-96 bg-gray-300 rounded-lg shadow-lg relative z-10 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                <motion.div
                  className="bg-white bg-opacity-40 p-5 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(79, 70, 229, 0.3)",
                      "0px 0px 20px rgba(79, 70, 229, 0.6)",
                      "0px 0px 0px rgba(79, 70, 229, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="h-16 w-16 text-indigo-500" />
                </motion.div>
              </div>
              <Image
                src="https://images.pexels.com/photos/4069293/pexels-photo-4069293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Demo video thumbnail"
                width={1280}
                height={720}
                className="w-full h-full object-cover overflow-hidden rounded-lg"
              />
            </motion.div>
            <p className="mt-4 text-center text-gray-500">
              Click to watch our 2-minute demo video
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Choose the plan that&apos;s right for you. All plans include a
              14-day free trial.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                title: "Basic",
                price: "$12",
                description: "Perfect for small personal websites.",
                features: ["1 website", "Free custom domain", "5 GB storage"],
                popular: false,
              },
              {
                title: "Professional",
                price: "$29",
                description: "For businesses and professional sites.",
                features: [
                  "10 websites",
                  "Free custom domain",
                  "20 GB storage",
                  "E-commerce features",
                ],
                popular: true,
              },
              {
                title: "Enterprise",
                price: "$99",
                description: "For large businesses and organizations.",
                features: [
                  "Unlimited websites",
                  "Free custom domains",
                  "100 GB storage",
                  "Advanced analytics",
                  "Dedicated support",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col`}
                variants={fadeIn}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute top-0 p-2 transform -translate-y-1/2 bg-indigo-600 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="flex items-center text-xs font-semibold text-white uppercase tracking-wide">
                      <Award className="h-3 w-3 mr-1" /> Most popular
                    </span>
                  </motion.div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </p>
                  <p className="mt-6 text-gray-500">{plan.description}</p>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <ShieldCheck className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#"
                    className={`mt-8 block w-full ${
                      plan.popular
                        ? "bg-indigo-600 border border-transparent text-white hover:bg-indigo-700"
                        : "bg-indigo-50 border border-indigo-800 text-indigo-600 hover:bg-indigo-100"
                    } rounded-md py-2 text-sm font-semibold text-center`}
                  >
                    Start free trial
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-16 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="max-w-3xl mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Small Business Owner",
                  quote:
                    "DragBuild made it so easy to create a professional website for my business. I was able to launch in just a few hours without any technical knowledge.",
                },
                {
                  name: "David Chen",
                  role: "Freelancer",
                  quote:
                    "The templates are beautiful and the drag-and-drop editor is so intuitive. I've recommended DragBuild to all my clients.",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Marketing Director",
                  quote:
                    "We needed to launch our campaign site quickly, and DragBuild delivered. The responsive design works perfectly on all devices.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                  variants={fadeIn}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="px-6 py-8">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-gray-500">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-indigo-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">
              Join thousands of satisfied customers today.
            </span>
          </motion.h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div
              className="inline-flex rounded-md shadow"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </motion.div>
            <motion.div
              className="ml-3 inline-flex rounded-md shadow"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn more
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Stay Updated
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Subscribe to our newsletter
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Get the latest news, features updates, and special offers directly
              to your inbox.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <form onSubmit={handleSubmit} className="mt-2 sm:flex">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <motion.div
                className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Notify me
                </button>
              </motion.div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about the protection of your data. Read our{" "}
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Trust Indicators */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Trusted By Thousands
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our platform is trusted by businesses worldwide
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  icon: <Shield className="h-10 w-10" />,
                  title: "Secure",
                  description: "Bank-level security to protect your data",
                },
                {
                  icon: <Sliders className="h-10 w-10" />,
                  title: "Customizable",
                  description: "Tailor every aspect to match your brand",
                },
                {
                  icon: <Monitor className="h-10 w-10" />,
                  title: "Modern",
                  description: "Always up-to-date with web standards",
                },
                {
                  icon: <Cpu className="h-10 w-10" />,
                  title: "Powerful",
                  description: "Advanced features with simple controls",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="flex items-center justify-center h-16 w-16 mx-auto text-indigo-500"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
