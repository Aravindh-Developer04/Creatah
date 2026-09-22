export const DEFAULT_SITE_URL = "https://www.creatah.com";

export const SEO_DATA = {
  "/": {
    title: "Custom Software Development Company in Chennai | Creatah",
    description: "Creatah is a premier custom software development company in Chennai specializing in high-performance mobile apps, enterprise web applications, cloud engineering, and dedicated IT staffing.",
    keywords: "custom software development company, software development services, software company chennai, mobile app development chennai, web development company chennai, IT staffing solutions, flutter development chennai, reactjs developers",
    canonical: "https://www.creatah.com/",
    ogType: "website",
    ogImage: "https://www.creatah.com/logo.webp",
  },
  "/about-us": {
    title: "About Us | Creatah Software Technologies | 10+ Years of Engineering Craft",
    description: "Learn about Creatah Software Technologies. 10+ years of software craftsmanship in Chennai, 540+ enterprise projects delivered, and 100% in-house software engineers.",
    keywords: "about creatah, software engineering firm chennai, bespoke software company, IT company velachery, enterprise software development, creatah software technologies",
    canonical: "https://www.creatah.com/about-us",
    ogType: "article",
    ogImage: "https://www.creatah.com/about-team-3d.jpg",
  },
  "/careers": {
    title: "Careers at Creatah | Engineering & Design Vacancies in Chennai | We're Hiring",
    description: "Explore open engineering and product roles at Creatah Software Technologies in Chennai. We are actively hiring Flutter developers, React engineers, UI/UX designers, and full stack architects.",
    keywords: "creatah careers, software jobs chennai, flutter developer jobs chennai, react developer vacancies, tech jobs velachery chennai, frontend hiring chennai",
    canonical: "https://www.creatah.com/careers",
    ogType: "website",
    ogImage: "https://www.creatah.com/career-hero-3d.jpg",
  },
  "/industries": {
    title: "Industry Verticals We Serve | Domain Expertise Across 18+ Sectors | Creatah",
    description: "Bespoke digital platforms tailored for 18+ core industry domains: Healthcare, Fintech, Logistics, Retail, Real Estate, Automotive, Education, and Manufacturing.",
    keywords: "healthcare software development, fintech application development, logistics supply chain software, custom ecommerce solutions, real estate erp chennai",
    canonical: "https://www.creatah.com/industries",
    ogType: "website",
    ogImage: "https://www.creatah.com/industries-ecosystem-3d.jpg",
  },
  "/process": {
    title: "Our 5-Step Engineering Process | Agile Software Development Lifecycle | Creatah",
    description: "Discover Creatah's proven 5-step engineering methodology: Deep Discovery, UI/UX Prototyping, Agile Development, Rigorous QA Testing, and CI/CD Cloud Deployment.",
    keywords: "software development process, agile sdlc methodology, software testing chennai, devops deployment pipeline, cloud architecture process",
    canonical: "https://www.creatah.com/process",
    ogType: "website",
    ogImage: "https://www.creatah.com/process-flow-3d.jpg",
  },
  "/contact-us": {
    title: "Contact Us | Technical Support & Project Consultations in Chennai | Creatah",
    description: "Connect directly with Creatah Software Technologies solution architects in Chennai. Fast 15-minute average response time for project discovery, quotes, and technology advisory.",
    keywords: "contact creatah, hire developers chennai, software development quotation, IT consulting chennai, creatah contact number email",
    canonical: "https://www.creatah.com/contact-us",
    ogType: "website",
    ogImage: "https://www.creatah.com/support-illustration.png",
  },
  "/request-a-proposal": {
    title: "Request a Free Project Proposal & Cost Estimate | Creatah",
    description: "Submit your project details for a comprehensive technical roadmap, architecture proposal, and transparent timeline estimate within 24 hours from Creatah experts.",
    keywords: "request software proposal, project cost estimate, app development quotation, software development proposal chennai",
    canonical: "https://www.creatah.com/request-a-proposal",
    ogType: "website",
    ogImage: "https://www.creatah.com/logo.webp",
  },
  "/admin": {
    title: "Admin Portal & Secure Control Center | Creatah",
    description: "Creatah Software Technologies Administrator Access Control Portal.",
    keywords: "creatah admin, portal",
    canonical: "https://www.creatah.com/admin",
    ogType: "website",
    ogImage: "https://www.creatah.com/logo.webp",
  },
};

export function getSeoForUrl(url = "/") {
  const clean = url.split("?")[0].split("#")[0].toLowerCase();
  if (clean.includes("admin")) return SEO_DATA["/admin"];
  if (clean.includes("about")) return SEO_DATA["/about-us"];
  if (clean.includes("career")) return SEO_DATA["/careers"];
  if (clean.includes("industr")) return SEO_DATA["/industries"];
  if (clean.includes("process")) return SEO_DATA["/process"];
  if (clean.includes("contact")) return SEO_DATA["/contact-us"];
  if (clean.includes("proposal") || clean.includes("consult")) return SEO_DATA["/request-a-proposal"];
  return SEO_DATA["/"];
}

export function generateSchemaJsonLd(seo) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.creatah.com/#organization",
      name: "Creatah Software Technologies",
      url: "https://www.creatah.com",
      logo: "https://www.creatah.com/logo.webp",
      description: "Leading custom software development company based in Chennai, India, delivering bespoke web, mobile, and cloud software solutions.",
      telephone: "+918838229241",
      email: "info@creatah.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Velachery",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600042",
        addressCountry: "IN"
      },
      sameAs: [
        "https://in.linkedin.com/company/creatah",
        "https://www.facebook.com/creatah.in/",
        "https://www.instagram.com/creatahsoftware/",
        "https://www.youtube.com/channel/UCs7LmMraebi9fV8OTpPAujg"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.creatah.com/#localbusiness",
      name: "Creatah Software Technologies",
      image: "https://www.creatah.com/logo.webp",
      url: "https://www.creatah.com",
      telephone: "+918838229241",
      priceRange: "$$ - $$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Velachery",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600042",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9815,
        longitude: 80.2180
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "19:00"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.creatah.com/#website",
      url: "https://www.creatah.com",
      name: "Creatah Software Technologies",
      description: seo.description,
      publisher: {
        "@id": "https://www.creatah.com/#organization"
      }
    }
  ];
}

export function buildMetaTagsHtml(seo) {
  const schemaJson = JSON.stringify(generateSchemaJsonLd(seo), null, 2);
  return `
    <title>${seo.title}</title>
    <meta name="title" content="${seo.title}" />
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${seo.keywords}" />
    <link rel="canonical" href="${seo.canonical}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="Creatah Software Technologies" />
    <meta name="publisher" content="https://www.creatah.com" />
    <meta name="theme-color" content="#080c18" />

    <!-- Geo Location Meta Tags (Chennai, Tamil Nadu, India) -->
    <meta name="geo.region" content="IN-TN" />
    <meta name="geo.placename" content="Chennai" />
    <meta name="geo.position" content="12.9815;80.2180" />
    <meta name="ICBM" content="12.9815, 80.2180" />

    <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
    <meta property="og:type" content="${seo.ogType}" />
    <meta property="og:site_name" content="Creatah Software Technologies" />
    <meta property="og:url" content="${seo.canonical}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:image" content="${seo.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Creatah Software Technologies" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@creatahsoftware" />
    <meta name="twitter:creator" content="@creatahsoftware" />
    <meta name="twitter:url" content="${seo.canonical}" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${seo.ogImage}" />

    <!-- Schema.org JSON-LD Structured Data -->
    <script type="application/ld+json">
${schemaJson}
    </script>
  `.trim();
}
