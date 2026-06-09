export type FeatureItem = {
  title: string;
  text: string;
};

export type ManufacturerCard = {
  name: string;
  specialty: string;
};

export type ProductItem = {
  id?: number;
  name: string;
  brand: string;
  status: "In Stock" | "Limited" | "Back Order";
  partNumber: string;
  description: string;
  image?: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  meta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type JobOpening = {
  title: string;
  team: string;
  employmentType: "Full-time" | "Internship";
  overview: string;
  responsibilities: string[];
  requirements: string[];
};

export type LegalSection = {
  heading: string;
  body: string[];
};


export type Brands = {
  name: string;
  url: string;
};

export const brands: Brands[] = [
  { name: "Mitsubishi", url: "/brands/mitsubishi" },
  { name: "Allen Bradley", url: "/brands/allen-bradley" },
  { name: "Siemens", url: "/brands/siemens" },
  { name: "Schneider", url: "/brands/schneider" },
  // { name: "Omron", url: "/brands/omron" },

  // Row 2
  { name: "Fanuc", url: "/brands/fanuc" },
  { name: "ABB", url: "/brands/abb" },
  // { name: "Yaskawa", url: "/brands/yaskawa" },
  // { name: "General Electric", url: "/brands/ge" },
  { name: "Indramat", url: "/brands/indramat" },

  // // Row 3
  // { name: "Beckhoff", url: "/brands/beckhoff" },
  // { name: "Honeywell", url: "/brands/honeywell" },
  // { name: "Lenze", url: "/brands/lenze" },
  // { name: "Phoenix", url: "/brands/phoenix" },
  // { name: "Kuka", url: "/brands/kuka" }, 

  // { name: "Danfoss", url: "/brands/danfoss" },
  // { name: "Emerson", url: "/brands/emerson" },
  // { name: "B&R", url: "/brands/bandr" },
  // { name: "Fuji", url: "/brands/fuji" },
  // { name: "Yokogawa", url: "/brands/yokogawa" },
];


export const legals: Brands[] = [
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Term & Conditions", url: "/terms-conditions" },
  { name: "Disclaimer", url: "/disclaimer" },
];

export const resources: Brands[] = [
  { name: "About Us", url: "/about-us" },
  { name: "Careers", url: "/careers" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Terms & Conditions", url: "/terms-conditions" },
  { name: "Disclaimer", url: "/disclaimer" }, 
  { name: "Contact Us", url: "/contact-us" },
];
export const userFullLinks: Brands[] = [
  { name: "About Us", url: "/about-us" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "Careers", url: "/careers" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Offer Product", url: "/offer-product-list" }, 
  { name: "Disclaimer", url: "/disclaimer" },
  { name: "Term & Conditions", url: "/terms-conditions" },
];

export const manufacturers: ManufacturerCard[] = [
  { name: "Siemens Automation", specialty: "PLCs, drives, and process control systems." },
  { name: "Rockwell Automation", specialty: "ControlLogix and industrial network architecture." },
  { name: "ABB Robotics", specialty: "Factory automation and motion control." },
  { name: "Schneider Electric", specialty: "Energy and industrial management platforms." },
  { name: "FANUC Corporation", specialty: "CNC systems, industrial robotics, and servo controls." },
  { name: "Mitsubishi Electric", specialty: "Factory automation components and HMIs." },
];
export const catalogProducts: ProductItem[] = [
  {
    id: 1,
    name: "SIMATIC S7-1500 CPU",
    brand: "Siemens",
    status: "In Stock",
    partNumber: "6ES7515-2AM02-0AB0",
    image: "/assets/products/1712807362.jpg",
    description:
      "Advanced PLC CPU for high-speed discrete and process automation.",
  },
  {
    id: 2,
    name: "Allen-Bradley CompactLogix PLC",
    brand: "Rockwell",
    status: "Limited",
    partNumber: "1769-L36ERM",
    image: "/assets/products/1713098462.jpg",
    description:
      "Mid-range programmable controller for machine-level control.",
  },
  {
    id: 3,
    name: "ABB ACS880 Industrial Drive",
    brand: "ABB",
    status: "In Stock",
    partNumber: "ACS880-01-145A-3",
    image: "/assets/products/1713098462.jpg",
    description:
      "General purpose AC drive with integrated safety and diagnostics.",
  },
  {
    id: 4,
    name: "Modicon M340 Processor Module",
    brand: "Schneider",
    status: "Back Order",
    partNumber: "BMXP342030",
    image: "/assets/products/1713098462.jpg",
    description:
      "Legacy PLC processor module with Ethernet communications.",
  },
  {
    id: 5,
    name: "FANUC Alpha i-Series Servo Motor",
    brand: "FANUC",
    status: "In Stock",
    partNumber: "A06B-0266-B200",
    image: "/assets/products/1713098462.jpg",
    description:
      "Precision servo motor for CNC and robotics applications.",
  },
  {
    id: 6,
    name: "Siemens SINAMICS G120 Control Unit",
    brand: "Siemens",
    status: "Limited",
    partNumber: "6SL3244-0BB13-1FA0",
    image: "/assets/products/1713098462.jpg",
    description:
      "Modular drive control unit for conveyor and pump systems.",
  },
  {
    id: 7,
    name: "Allen-Bradley PanelView Plus 7",
    brand: "Rockwell",
    status: "In Stock",
    partNumber: "2711P-T10C22D9P",
    image: "/assets/products/1713098462.jpg",
    description:
      "10-inch HMI terminal for modern operator interfaces.",
  },
  {
    id: 8,
    name: "ABB S800 I/O Module",
    brand: "ABB",
    status: "In Stock",
    partNumber: "3BSE008510R1",
    image: "/assets/products/1713098462.jpg",
    description:
      "Distributed I/O module for process and factory automation.",
  },
  {
    id: 9,
    name: "Schneider Magelis HMI",
    brand: "Schneider",
    status: "Back Order",
    partNumber: "HMIGTO5310",
    image: "/assets/products/1713098462.jpg",
    description:
      "Legacy touchscreen HMI for machine visualization.",
  },
];

export const catalogProductPages: ProductItem[][] = [
  catalogProducts,
  [
    {
      id: 10,
      name: "Mitsubishi FX5U CPU Module",
      brand: "Mitsubishi",
      status: "In Stock",
      partNumber: "FX5U-32MR/ES",
      image: "/assets/products/1712807362.jpg",
      description:
        "Compact PLC with built-in Ethernet for small automation lines.",
    },
    {
      id: 11,
      name: "Yaskawa Sigma-7 Servo Pack",
      brand: "Yaskawa",
      status: "Limited",
      partNumber: "SGD7S-2R8A00A",
      image: "/assets/products/1713098462.jpg",
      description:
        "Servo amplifier for high-precision motion control systems.",
    },
    {
      id: 12,
      name: "Omron NX102 CPU Unit",
      brand: "Omron",
      status: "In Stock",
      partNumber: "NX102-9020",
      image: "/assets/products/1713098462.jpg",
      description:
        "Machine automation controller with synchronized motion.",
    },
    {
      id: 13,
      name: "B&R X20 Digital Input Module",
      brand: "B&R",
      status: "In Stock",
      partNumber: "X20DI9371",
      image: "/assets/products/1713098462.jpg",
      description:
        "High-density input module for modular PLC architectures.",
    },
    {
      id: 14,
      name: "GE RX3i Power Supply",
      brand: "GE",
      status: "Limited",
      partNumber: "IC695PSD040",
      image: "/assets/products/1713098462.jpg",
      description:
        "Reliable system power supply for RX3i PAC racks.",
    },
    {
      id: 15,
      name: "Honeywell C300 Controller",
      brand: "Honeywell",
      status: "Back Order",
      partNumber: "CC-PCNT01",
      image: "/assets/products/1713098462.jpg",
      description:
        "Process controller module for Experion control platforms.",
    },
    {
      id: 16,
      name: "Bosch Rexroth IndraDrive Cs",
      brand: "Bosch Rexroth",
      status: "In Stock",
      partNumber: "HCS02.1E-W0054",
      image: "/assets/products/1713098462.jpg",
      description:
        "Servo drive for precise spindle and axis applications.",
    },
    {
      id: 17,
      name: "Delta ASDA-A2 Servo Drive",
      brand: "Delta",
      status: "In Stock",
      partNumber: "ASD-A2-2023-M",
      image: "/assets/products/1713098462.jpg",
      description:
        "Cost-effective AC servo drive for packaging equipment.",
    },
    {
      id: 18,
      name: "Keyence KV-8000 Controller",
      brand: "Keyence",
      status: "Limited",
      partNumber: "KV-8000",
      image: "/assets/products/1713098462.jpg",
      description:
        "High-performance PLC for rapid I/O and traceability data.",
    },
  ],
];
export const blogPosts: BlogPost[] = [
  {
    title: "Optimizing Your Supply Chain for Automation Parts in 2026",
    excerpt: "Strategies for reducing lead times and minimizing downtime with reliable automation sourcing.",
    meta: "October 26, 2026 - 8 min read",
  },
  {
    title: "The Future of Industrial Automation: Trends to Watch",
    excerpt: "How AI-enabled controls, smart diagnostics, and resilient systems are reshaping production.",
    meta: "October 20, 2026 - 12 min read",
  },
  {
    title: "Navigating Obsolescence: Sourcing Hard-to-Find Parts",
    excerpt: "Best practices to source discontinued parts while maintaining quality and compliance.",
    meta: "October 10, 2026 - 7 min read",
  },
  {
    title: "Global Sourcing Strategies: Expanding Your Reach",
    excerpt: "Build trusted international channels for faster response and lower procurement risk.",
    meta: "September 28, 2026 - 10 min read",
  },
  {
    title: "Preventative Maintenance: Reduce Downtime with Smart Procurement",
    excerpt: "Use lifecycle-based spare planning to improve uptime and maintenance readiness.",
    meta: "September 16, 2026 - 8 min read",
  },
  {
    title: "The Impact of Industry 4.0 on Spare Parts Management",
    excerpt: "How connected systems and predictive insights are improving parts visibility and planning.",
    meta: "September 8, 2026 - 11 min read",
  },
];

export const faqByCategory: Record<string, FaqItem[]> = {
  Ordering: [
    {
      question: "What warranty do you offer on your parts?",
      answer: `For all new, repaired or reconditioned units sold, a minimum of 12 months warranty
      is applicable. Should you encounter any issues within the warranty period, please contact our 
      customer service team for further advice.`,
    },
    {
      question: "What is the return policy?",
      answer: `Request for returns* of any units sold should be reported to PLC Automation within 7
      days of delivery. Returned items must be received by PLC Automation for inspection within
      14 days from the date of receipt. Returned items must be received with original packaging,
      documentation, unused and in re-sellable condition. 
      *Terms and conditions apply`,
    },
    {
      question: "How do I place an order?",
      answer: `Placing an order is as simple as blinking your eyes, either e-mail us or contact the 
      person from sales team by whom you received your quotation and they will take it from there, 
      or you can call the sales team directly on (+65) 8950 2441 / (+65) 8952 9493`,
    },
    {
      question: "How do I place an order?",
      answer: `Placing an order is as simple as blinking your eyes, either e-mail us or contact the 
      person from sales team by whom you received your quotation and they will take it from there, 
      or you can call the sales team directly on (+65) 8950 2441 / (+65) 8952 9493`,
    },
    {
      question: "When will my order be shipped?",
      answer: `Delivery time for the product is either mentioned on the quote or by the sales person,
      so as soon as the payment is made, the ordered parts will be processed for shipment. We, at PLC
      Automation, aim to deliver the parts within 24 Hours (to the possible nearest location) to 14
      Days maximum (to far reach places).`,
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support bank transfer and approved corporate payment channels based on account terms.",
    },
    {
      question: "Can I modify or cancel an order?",
      answer: "Order changes are possible before dispatch. Once shipped, returns are processed according to policy.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes. Tiered pricing is available for repeat or high-volume procurement programs.",
    },
  ],
  Shipping: [
    {
      question: "Do you ship internationally?",
      answer: "Yes, we support global logistics with trusted courier and freight partners.",
    },
    {
      question: "How long does delivery take?",
      answer: "Transit time depends on destination and service level. Expedited options are available.",
    },
  ],
  "Parts Authenticity": [
    {
      question: "How do you verify part authenticity?",
      answer: "Every part goes through source verification, traceability checks, and incoming inspection.",
    },
    {
      question: "Do you provide warranty support?",
      answer: "Warranty terms are quoted per item and supported through our procurement service desk.",
    },
  ],
};

export const jobOpenings: JobOpening[] = [
  {
    title: "Sales Engineer",
    team: "Sales",
    employmentType: "Full-time",
    overview:
      "We are looking for a technically strong and customer-focused Sales Engineer to join our growing team. You will work closely with customers to understand their automation needs and propose suitable solutions using PLC systems, industrial automation products, and related technologies.",
    responsibilities: [
      "Identify and develop new sales opportunities in industrial automation.",
      "Provide consultation and solution proposals to customers.",
      "Prepare quotations, proposals, and technical presentations.",
      "Work closely with engineering teams to deliver customer solutions.",
      "Build and maintain strong relationships with clients.",
      "Support project discussions and technical clarifications.",
      "Cold calling and prospecting is the core of your responsibility.",
    ],
    requirements: [
      "Diploma or Degree in Electrical, Electronics, Mechatronics, Business or related field.",
      "Experience in automation, PLC systems, or industrial solutions preferred.",
      "Strong communication and presentation skills.",
      "Ability to understand technical solutions and translate them into customer value.",
      "Self-motivated with strong problem-solving skills.",
    ],
  },
  {
    title: "Junior Sales Engineer",
    team: "Sales",
    employmentType: "Full-time",
    overview:
      "This role is ideal for fresh graduates or early-career sales engineers who want to develop sales skills in the automation industry. You will be mentored by senior sales engineers while learning how to provide automation solutions to industrial clients.",
    responsibilities: [
      "Support the sales team in preparing quotations and proposals.",
      "Assist in technical discussions with customers.",
      "Learn automation products, PLC systems, and industrial solutions.",
      "Participate in client meetings and site visits.",
      "Help with product demonstrations and presentations.",
      "Cold calling and prospecting is the core of your responsibility.",
    ],
    requirements: [
      "Diploma or Degree in Electrical, Electronics, Automation, Business or related field.",
      "Fresh graduates are encouraged to apply.",
      "Interest in both engineering and customer engagement.",
      "Strong willingness to learn and grow.",
      "Good communication and teamwork skills.",
    ],
  },
  {
    title: "Marketing Intern",
    team: "Marketing",
    employmentType: "Internship",
    overview:
      "We are looking for creative and enthusiastic Marketing Interns to support our marketing initiatives. This role offers hands-on experience in digital marketing, branding, and content creation.",
    responsibilities: [
      "Assist in managing social media platforms.",
      "Help create marketing content such as posts, graphics, and videos.",
      "Support website updates and marketing campaigns.",
      "Conduct market and competitor research.",
      "Assist in event planning and promotional activities.",
    ],
    requirements: [
      "Currently pursuing a diploma or degree in Marketing, Business, or a related field.",
      "Creative mindset with strong communication skills.",
      "Familiarity with social media platforms.",
      "Basic design or content creation skills are a plus.",
    ],
  },
  {
    title: "IT Intern",
    team: "Information Technology",
    employmentType: "Internship",
    overview:
      "The IT Intern will assist in supporting internal IT infrastructure, software systems, and digital tools used within the company.",
    responsibilities: [
      "Assist in maintaining company IT systems and hardware.",
      "Support internal software tools and systems.",
      "Help troubleshoot technical issues.",
      "Assist with system documentation and testing.",
      "Support development or automation of internal tools when applicable.",
    ],
    requirements: [
      "Currently pursuing a diploma or degree in IT, Computer Science, or a related field.",
      "Basic understanding of networking and computer systems.",
      "Problem-solving mindset.",
      "Interest in learning real-world IT operations.",
    ],
  },
  {
    title: "Business Development Intern",
    team: "Business Development",
    employmentType: "Internship",
    overview:
      "This role is ideal for students interested in sales strategy, partnerships, and market expansion within the automation industry.",
    responsibilities: [
      "Conduct market research and identify potential customers.",
      "Assist with lead generation and prospecting.",
      "Support preparation of business proposals.",
      "Help analyze market opportunities.",
      "Assist with CRM updates and business reporting.",
    ],
    requirements: [
      "Currently pursuing a diploma or degree in Business, Marketing, or a related field.",
      "Strong research and analytical skills.",
      "Good communication skills.",
      "Interest in sales, strategy, and business growth.",
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: [
      "We collect contact information, company details, and enquiry content when you submit forms on our website.",
      "Technical data such as browser type and usage analytics may be collected to improve platform performance.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: [
      "To respond to enquiries, process requests, and provide procurement support.",
      "To improve website security, service quality, and user experience.",
    ],
  },
  {
    heading: "3. Data Security",
    body: [
      "We apply administrative and technical safeguards to protect your data from unauthorized access.",
      "Access is restricted to authorized personnel with a business need.",
    ],
  },
  {
    heading: "4. Your Rights",
    body: [
      "You may request access, correction, or deletion of personal data, subject to applicable legal requirements.",
    ],
  },
  {
    heading: "5. Contact",
    body: ["For privacy requests, email legal@industrialsourceconnect.com."],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "By accessing this website, you agree to these Terms & Conditions and applicable laws.",
      "If you disagree with any term, please discontinue use of the site.",
    ],
  },
  {
    heading: "2. User Obligations",
    body: [
      "You agree to provide accurate information and use the site for lawful business purposes only.",
      "Misuse, unauthorized access attempts, or fraudulent actions are prohibited.",
    ],
  },
  {
    heading: "3. Intellectual Property",
    body: [
      "All site content, branding, and materials are owned or licensed by Industrial Source Connect.",
    ],
  },
  {
    heading: "4. Disclaimers and Limitation of Liability",
    body: [
      "Information is provided as-is for general guidance and may change without notice.",
      "Industrial Source Connect is not liable for indirect or consequential losses arising from site use.",
    ],
  },
  {
    heading: "5. Governing Law",
    body: ["These terms are governed by the laws of Singapore."],
  },
];

export const disclaimerSections: LegalSection[] = [
  {
    heading: "Accuracy of Information",
    body: [
      "We aim to keep all information current, but no guarantee is made on completeness, accuracy, or availability.",
    ],
  },
  {
    heading: "Product Sourcing and Conditions",
    body: [
      "Industrial Source Connect acts as a sourcing intermediary between buyers and suppliers.",
      "Availability and condition details are provided by sourcing partners and may change over time.",
    ],
  },
  {
    heading: "External Links",
    body: ["We are not responsible for third-party site content or privacy practices."],
  },
  {
    heading: "Changes to Disclaimer",
    body: ["This disclaimer may be updated periodically. Revised versions apply once posted."],
  },
];
