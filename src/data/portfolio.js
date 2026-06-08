export const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const skills = [
  {
    category: 'Core',
    title: 'Languages & Frameworks',
    tags: ['JavaScript ES6+', 'TypeScript', 'React.js', 'Next.js', 'React Native'],
  },
  {
    category: 'Immersive',
    title: '3D & Animation',
    tags: ['Three.js', 'GSAP', 'WebGL', 'Camera Controls', 'Model Animation'],
  },
  {
    category: 'Architecture',
    title: 'State & Routing',
    tags: ['Zustand', 'React Router', 'App Router', 'Context API'],
  },
  {
    category: 'Interface',
    title: 'Styling & UI Systems',
    tags: ['Tailwind CSS', 'Shadcn UI', 'Chakra UI', 'Styled Components', 'CSS Modules'],
  },
  {
    category: 'Tooling',
    title: 'Dev Tools & Backend',
    tags: ['Git / GitHub', 'Appwrite', 'Chrome DevTools', 'Performance Opt.', 'Mobile-First'],
  },
];

export const experiences = [
  {
    date: 'APR 2023 - MAY 2024',
    role: 'Front-End Developer',
    company: 'droplinked / Contract · Remote',
    items: [
      'Built responsive, componentized UIs using React and Tailwind CSS with accessible markup and mobile-first layouts.',
      'Implemented interactive 3D product viewers with Three.js, including camera controls and smooth animations.',
      'Developed cross-platform mobile UI components in React Native integrated with Appwrite for auth and data.',
      'Collaborated with QA and stakeholders to triage issues and improve app performance and stability.',
      'Created reusable UI patterns and documentation to speed up feature development across projects.',
    ],
  },
    {
    date: 'MAY 2024 - AUGUST 2024',
    role: 'Dashboard Platform for Student Advisers & Accounting',
    company: 'Independent / Contract · Remote',
    items: [
      'Designed and developed a web-based dashboard to manage adviser-student interactions and track academic progress',
      'Implemented accounting and financial handling features, including balance tracking and results reporting',
      'Created data visualization components to display student results and financial summaries clearly and interactively.',
    ],
  },
];

export const projects = [
  {
    number: '001',
    title: '3D Product Viewer',
    description:
      'Interactive 3D product model viewer with model rotation, zoom, and camera animation for intuitive product inspection and exploration.',
    stack: ['React', 'Three.js', 'WebGL', 'GSAP'],
    href: 'https://tshirt-viewer.netlify.app/',
  },
  {
    number: '002',
    title: 'Student Adviser Dashboard',
    description:
      'Web-based platform managing adviser-student interactions and academic progress, with accounting features, balance tracking, and interactive data visualizations.',
    stack: ['React', 'Tailwind CSS', 'Zustand', 'Data Viz'],
    href: 'https://github.com/EhsanKinux/deltakonkur',
  },
];

export const languages = [
  { name: 'Persian', level: 100 },
  { name: 'English', level: 70 },
  { name: 'Korean', level: 30 },
  { name: 'Chinese', level: 10 },
];

export const education = [
  {
    degree: 'B.Sc. Computer Engineering',
    school: 'Hamedan University of Technology',
    info: 'Expected 2026 · Data Structures, Algorithms, Web Dev, Networks, SQL Databases, Matlab (computer vision), C/C++, Java, Python',
  },
  {
    degree: 'Front-End Bootcamp',
    school: 'Intensive Training Program',
    info: '80+ hours · 2022-2023 · JavaScript, React, UI Design',
  },
];

export const contactLinks = [
  { href: 'mailto:ehsankhwentao@gmail.com', icon: '&#9993;', label: 'Email' },
  { href: 'https://github.com/EhsanKinux', icon: '&#8997;', label: 'GitHub', external: true },
  {
    href: 'https://www.linkedin.com/in/ehsan-khodaveysi-1a61a71b6',
    icon: 'in',
    label: 'LinkedIn',
    external: true,
  },
  { href: 'tel:+989182166128', icon: '&#9742;', label: 'Phone' },
];
