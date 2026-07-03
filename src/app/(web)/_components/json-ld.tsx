/* eslint-disable @typescript-eslint/no-explicit-any */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.caworks.ai";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Organization Schema ─── */
export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Aiqwip Technologies Private Limited",
        alternateName: "Aiqwip",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/meta/favicon.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/meta/og-image.png`,
          width: 1200,
          height: 630,
        },
        description:
          "We Help Early Stage Startups Ship AI Native Products Faster. 4-Week MVP Guarantee, Full-Stack AI Team, Ongoing Partnership.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Scalex Loop, Embassy Golf Links Rd, Challaghatta",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560037",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-8050130728",
          email: "info@aiqwip.com",
          contactType: "sales",
          availableLanguage: ["English"],
          areaServed: ["US"],
        },
        sameAs: [
          "https://www.linkedin.com/company/aiqwip",
          "https://x.com/SairamCh_",
          "https://www.youtube.com/@aiqwip",
        ],
        foundingDate: "2024-01",
      }}
    />
  );
}

/* ─── Website Schema ─── */
export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Aiqwip",
        url: SITE_URL,
        image: `${SITE_URL}/images/meta/og-image.png`,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/meta/og-image.png`,
          width: 1200,
          height: 630,
          contentUrl: `${SITE_URL}/images/meta/og-image.png`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/blogs?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        accessibilityFeature: [
          "highContrastDisplay",
          "readingOrder",
          "structuralNavigation",
          "alternativeText",
        ],
        accessibilityHazard: "none",
        accessMode: ["textual", "visual"],
      }}
    />
  );
}

/* ─── FAQ Schema ─── */
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

/* ─── Contact Page Schema ─── */
export function ContactPageSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Aiqwip",
        url: `${SITE_URL}/contact-us`,
        description:
          "Book a free 30-minute discovery call with Aiqwip. We help US startups build AI products fast.",
        mainEntity: {
          "@type": "Organization",
          name: "Aiqwip Technologies Private Limited",
          url: SITE_URL,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-8050130728",
              email: "info@aiqwip.com",
              contactType: "sales",
              availableLanguage: ["English"],
              areaServed: "US",
            },
          ],
        },
      }}
    />
  );
}

/* ─── Local Business / Professional Service Schema ─── */
export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Aiqwip Technologies Private Limited",
        url: SITE_URL,
        logo: `${SITE_URL}/images/meta/favicon.png`,
        image: `${SITE_URL}/images/meta/og-image.png`,
        telephone: "+91-8050130728",
        email: "info@aiqwip.com",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Scalex Loop, Embassy Golf Links Rd, Challaghatta",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560037",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "United States" },
        serviceType: "AI Product Development",
        sameAs: [
          "https://www.linkedin.com/company/aiqwip",
          "https://x.com/SairamCh_",
          "https://www.youtube.com/@aiqwip",
        ],
      }}
    />
  );
}

/* ─── Person Schema (Founder) ─── */
export function PersonSchema({
  name,
  jobTitle,
  url,
  image,
}: {
  name: string;
  jobTitle: string;
  url?: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle,
        ...(url && { url }),
        ...(image && { image }),
        worksFor: {
          "@type": "Organization",
          name: "Aiqwip Technologies Private Limited",
          url: SITE_URL,
        },
      }}
    />
  );
}

/* ─── Service Schema ─── */
export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
          "@type": "Organization",
          name: "Aiqwip Technologies Private Limited",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "United States" },
      }}
    />
  );
}

/* ─── Blog/Article Schema ─── */
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  authorName?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        ...(dateModified && { dateModified }),
        image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
        author: authorName
          ? { "@type": "Person", name: authorName }
          : { "@type": "Organization", name: "Aiqwip", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "Aiqwip",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/meta/favicon.png`,
          },
        },
        accessibilityFeature: ["alternativeText", "readingOrder"],
        accessMode: ["textual", "visual"],
      }}
    />
  );
}

/* ─── Job Posting Schema ─── */
export function JobPostingSchema({
  title,
  description,
  location,
  employmentType,
  datePosted,
  validThrough,
}: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  datePosted?: string;
  validThrough?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title,
        description,
        ...(datePosted && { datePosted }),
        ...(validThrough && { validThrough }),
        hiringOrganization: {
          "@type": "Organization",
          name: "Aiqwip Technologies Private Limited",
          sameAs: SITE_URL,
          logo: `${SITE_URL}/images/meta/favicon.png`,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: location.includes("Remote")
              ? "Bengaluru"
              : location,
            addressCountry: "IN",
          },
        },
        employmentType:
          employmentType === "Full-time" ? "FULL_TIME" : employmentType,
        jobLocationType: location.includes("Remote")
          ? "TELECOMMUTE"
          : undefined,
      }}
    />
  );
}

/* ─── Site Navigation Schema ─── */
export function SiteNavigationSchema() {
  const navItems = [
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "Solutions", url: `${SITE_URL}/solutions` },
    { name: "Portfolio", url: `${SITE_URL}/portfolio` },
    { name: "Pricing", url: `${SITE_URL}/pricing` },
    { name: "About Us", url: `${SITE_URL}/about-us` },
    { name: "Blog", url: `${SITE_URL}/blogs` },
    { name: "Contact Us", url: `${SITE_URL}/contact-us` },
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        name: navItems.map((item) => item.name),
        url: navItems.map((item) => item.url),
      }}
    />
  );
}

/* ─── Breadcrumb Schema ─── */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
