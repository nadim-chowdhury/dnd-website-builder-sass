import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
// import { fadeIn, staggerChildren } from "@/lib/motionVariants"; // Assume you have these defined

export default function FAQSection() {
  const faqs = [
    {
      question: "Do I need any coding knowledge to use DragBuild?",
      answer:
        "Not at all! Our platform is designed for users with zero coding experience. The intuitive drag-and-drop interface allows you to build professional websites without writing a single line of code.",
    },
    {
      question: "Can I connect my own domain name?",
      answer:
        "Yes, you can easily connect your own custom domain to your DragBuild website. We also offer free domains with our Professional and Enterprise plans.",
    },
    {
      question: "Is my website mobile-friendly?",
      answer:
        "Absolutely! All websites created with DragBuild are automatically responsive and will look great on any device - mobile, tablet, or desktop.",
    },
    {
      question: "Can I switch between templates after I've started building?",
      answer:
        "Yes, you can switch templates at any time. Your content will be transferred to the new template, though you may need to make some adjustments to ensure everything looks perfect.",
    },
    {
      question: "Do you offer e-commerce functionality?",
      answer:
        "Yes, our Professional and Enterprise plans include e-commerce features that allow you to set up an online store, process payments, and manage inventory.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          //   variants={fadeIn}
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            FAQ
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Find answers to the most common questions about our service.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          //   variants={staggerChildren}
        >
          <Accordion type="multiple" className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
