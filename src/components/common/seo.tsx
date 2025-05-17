import React from "react";
import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

/**
 * SEO component
 * Manages meta tags for SEO optimization
 */
const SEO: React.FC<SeoProps> = ({
  title = "Website Builder",
  description = "Create beautiful websites with our drag and drop website builder",
  keywords = ["website builder", "drag and drop", "no-code"],
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noIndex = false,
  structuredData,
  children,
}) => {
  // Convert keywords array to string
  const keywordsString = keywords.join(", ");

  // Create structured data script
  let structuredDataScript;
  if (structuredData) {
    structuredDataScript = {
      __html: JSON.stringify(structuredData),
    };
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* No Index */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data */}
      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={structuredDataScript}
        />
      )}

      {/* Additional head elements */}
      {children}
    </Head>
  );
};

export default SEO;
