import type { ServiceItem } from '../types/index.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    badge: 'Core Competency',
    iconName: 'Globe',
    shortDescription:
      'High-performance, enterprise-grade web applications engineered for scalability, ironclad security, and intuitive user experiences.',
    detailedDescription:
      'At Davidox Limited, we architect and deliver bespoke web applications tailored to the operational demands of forward-thinking enterprises. From mission-critical SaaS platforms to dynamic customer portals and enterprise resource interfaces, we leverage modern microservices, responsive frontend frameworks, and cloud-native backends to drive measurable business velocity.',
    keyBenefits: [
      'Engineered for blazing fast speed and responsive cross-device consistency',
      'Scalable cloud-ready architectures handling millions of concurrent operations',
      'Modern API-first connectivity with robust third-party system integrations',
      'Enterprise security standards with end-to-end data encryption and role authorization',
      'Continuous Integration / Continuous Deployment (CI/CD) automated pipelines',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'GraphQL'],
  },
  {
    id: 'mobile-application-development',
    title: 'Mobile Application Development',
    badge: 'iOS & Android',
    iconName: 'Smartphone',
    shortDescription:
      'Native and hybrid cross-platform mobile apps providing seamless performance, engaging interfaces, and real-time offline synchronization.',
    detailedDescription:
      'We craft standout mobile experiences that captivate users and streamline customer touchpoints. Whether you need an agile cross-platform app or a specialized native deployment, Davidox Limited ensures silky smooth 60fps animations, intelligent local caching, biometric security, and push notification architectures.',
    keyBenefits: [
      'Unified codebase efficiency across iOS and Android with zero compromise on feel',
      'Offline-first architecture with automatic background data synchronization',
      'Hardware integration with camera, GPS, NFC, Bluetooth, and biometric sensors',
      'App Store and Google Play publication, compliance management, and telemetry',
      'Proactive performance monitoring and crash analytics integration',
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'RESTful APIs', 'SQLite', 'WebSockets'],
  },
  {
    id: 'software-development',
    title: 'Custom Software Development',
    badge: 'Enterprise Tailored',
    iconName: 'Code2',
    shortDescription:
      'Bespoke software systems engineered to solve complex operational challenges, replace legacy debt, and accelerate enterprise efficiency.',
    detailedDescription:
      'Off-the-shelf software rarely fits intricate business models. Davidox Limited designs bespoke enterprise software from the ground up, aligning domain logic with high-throughput architecture. We turn intricate operational workflows into cohesive, reliable, and secure proprietary digital assets that yield competitive advantages.',
    keyBenefits: [
      'Tailored 100% to your proprietary workflows, data models, and team protocols',
      'Elimination of recurring commercial licensing overhead and vendor lock-in',
      'Legacy system modernization and non-disruptive phased data migration',
      'Comprehensive automated unit, integration, and end-to-end test coverage',
      'Clean domain-driven design ensuring long-term code maintainability',
    ],
    technologies: ['Python', 'Go', 'Node.js', 'C# / .NET', 'Java', 'PostgreSQL', 'Redis', 'Kafka'],
  },
  {
    id: 'cloud-computing-solutions',
    title: 'Cloud Computing Solutions',
    badge: 'Cloud Native',
    iconName: 'Cloud',
    shortDescription:
      'Strategic cloud migration, serverless infrastructure orchestration, and DevOps optimization on Google Cloud, AWS, and Azure.',
    detailedDescription:
      'Transform your IT infrastructure with resilient cloud architectures that scale on demand while optimizing expenditure. Davidox Limited engineers multi-cloud, hybrid-cloud, and serverless architectures with automated auto-scaling, container orchestration, and disaster recovery failover systems.',
    keyBenefits: [
      'High-availability architectures with 99.99% operational uptime SLA targets',
      'Dynamic auto-scaling infrastructure that adapts to volatile consumer traffic',
      'Cost optimization via right-sizing, spot workloads, and serverless compute',
      'Automated disaster recovery, geo-replication, and automated point-in-time backup',
      'Zero-trust cloud network security, IAM policy hardening, and VPC segmentation',
    ],
    technologies: ['Google Cloud Platform', 'AWS', 'Microsoft Azure', 'Kubernetes', 'Terraform', 'Serverless', 'Cloudflare'],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting and Advisory',
    badge: 'Strategic Growth',
    iconName: 'Compass',
    shortDescription:
      'Executive technology strategy, enterprise architecture roadmapping, IT audit, and vendor evaluation to drive maximum ROI.',
    detailedDescription:
      'Navigate technological disruptions with seasoned guidance. Our senior IT consultants partner with C-suite executives and IT directors to assess current infrastructure, uncover vulnerabilities, formulate digital technology roadmaps, and select high-impact tools that accelerate revenue and protect capital.',
    keyBenefits: [
      'Holistic technological audits identifying bottlenecks, vulnerabilities, and inefficiencies',
      'Vendor-agnostic evaluation and negotiation support for enterprise software acquisitions',
      'Strategic IT roadmaps mapped directly to organizational quarterly and annual milestones',
      'Cybersecurity posture assessment and governance compliance frameworks',
      'Resource planning, engineering team coaching, and technical leadership advisory',
    ],
    technologies: ['Enterprise Architecture', 'TOGAF', 'Agile / Scrum', 'Security Auditing', 'Cost Modeling', 'Compliance (ISO 27001 / GDPR)'],
  },
  {
    id: 'computer-networking-infrastructure',
    title: 'Computer Networking & Infrastructure',
    badge: 'Hardware & Network',
    iconName: 'Network',
    shortDescription:
      'Enterprise LAN/WAN architecture, structured cabling, secure VPNs, firewalls, and reliable on-premise infrastructure setup.',
    detailedDescription:
      'A dependable business begins with an unyielding network backbone. Davidox Limited designs, deploys, and manages robust enterprise networks, secure Wi-Fi 6 ecosystems, software-defined WANs (SD-WAN), and corporate server rooms that guarantee low latency, airtight security, and zero downtime.',
    keyBenefits: [
      'High-throughput structured cabling, fiber backbones, and server rack installations',
      'Enterprise firewall deployment, intrusion detection (IDS/IPS), and perimeter defenses',
      'Secure multi-branch site-to-site VPNs and encrypted remote work connectivity',
      'High-density corporate Wi-Fi mesh planning with zero dead zones',
      '24/7 proactive network monitoring, bandwidth optimization, and latency mitigation',
    ],
    technologies: ['Cisco', 'Ubiquiti UniFi', 'Fortinet', 'MikroTik', 'SD-WAN', 'VLANs', 'Zero Trust Network Access'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    badge: 'Human Centred',
    iconName: 'Palette',
    shortDescription:
      'User research, high-fidelity wireframing, interactive prototyping, and design systems that elevate conversions and delight users.',
    detailedDescription:
      'World-class technology is only as good as its user adoption. Our product design team combines cognitive psychology, user journey mapping, and pixel-perfect design craftsmanship to produce interfaces that are effortless to navigate, aesthetically memorable, and strictly accessible (WCAG 2.1 AA compliant).',
    keyBenefits: [
      'In-depth stakeholder and end-user research, persona development, and journey mapping',
      'Comprehensive Design Systems with reusable UI component libraries and tokens',
      'Rapid clickable prototyping for iterative stakeholder validation and user testing',
      'Measurable conversion rate optimization through data-informed interface refinements',
      'Rigorous accessibility compliance across contrast ratios and screen readers',
    ],
    technologies: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Framer', 'UserTesting', 'Storybook', 'WCAG 2.1 AA'],
  },
  {
    id: 'business-process-automation',
    title: 'Business Process Automation',
    badge: 'Efficiency & AI',
    iconName: 'Cpu',
    shortDescription:
      'Automate repetitive workflows, bridge disparate databases, and eliminate human error with smart automated pipelines.',
    detailedDescription:
      'Empower your team to focus on strategic initiatives by automating manual, error-prone data entry and cross-platform handoffs. Davidox Limited builds bespoke event-driven automations, ERP/CRM synchronization bridges, automated invoice pipelines, and intelligent alerting engines.',
    keyBenefits: [
      'Elimination of manual repetitive tasks, reducing processing latency from days to seconds',
      'Near-zero operational error rates in mission-critical finance and order processing',
      'Seamless data bridging across legacy systems, spreadsheets, CRMs, and payment gateways',
      'Automated customer onboarding sequences and notifications via Email/SMS/WhatsApp',
      'Auditable workflow logs and visual execution telemetry dashboards',
    ],
    technologies: ['Python RPA', 'Zapier / Make', 'n8n', 'Node.js', 'Webhook Engines', 'Apache Airflow', 'REST APIs'],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    badge: 'Enterprise Evolution',
    iconName: 'Zap',
    shortDescription:
      'Comprehensive modernization of corporate operations, customer experiences, and digital culture for the modern economy.',
    detailedDescription:
      'Digital transformation is more than adopting software—it is reinventing how value is delivered to your customers. Davidox Limited shepherds mid-market and enterprise organizations through full-spectrum digital evolution, dismantling silos, modernizing core architectures, and instituting agile data-driven decision frameworks.',
    keyBenefits: [
      'End-to-end modernization of paper-based and disjointed legacy company operations',
      'Creation of new digital revenue streams and customer self-service channels',
      'Establishment of unified real-time executive dashboards and business intelligence',
      'Change management support ensuring frictionless employee adoption and enthusiasm',
      'Continuous technological resilience against emergent market disruptors',
    ],
    technologies: ['Cloud Platforms', 'Data Lakes', 'API Gateways', 'BI Dashboards', 'Agile Methodologies', 'Change Frameworks'],
  },
  {
    id: 'it-support-and-maintenance',
    title: 'IT Support and Maintenance',
    badge: '24/7 Reliability',
    iconName: 'ShieldCheck',
    shortDescription:
      'Round-the-clock helpdesk, proactive server monitoring, security patching, and ongoing software enhancements.',
    detailedDescription:
      'Keep your business operations humming without unexpected interruptions. Davidox Limited delivers dedicated Service Level Agreement (SLA) managed IT support. We oversee system health, preemptively apply critical security patches, manage backups, and provide swift resolution whenever technical hurdles arise.',
    keyBenefits: [
      'Guaranteed rapid SLA response times with dedicated tiered support engineers',
      '24/7 automated uptime and infrastructure health telemetry with instant paging',
      'Regular security audits, OS updates, library dependency upgrades, and patch management',
      'Scheduled off-site backups with proven disaster recovery verification drills',
      'Continuous application feature polish, database re-indexing, and query optimization',
    ],
    technologies: ['Helpdesk Portals', 'Automated Monitoring', 'Uptime Kuma', 'Sentry', 'Datadog', 'Disaster Recovery Systems'],
  },
];
