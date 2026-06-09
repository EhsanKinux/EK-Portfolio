export const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const skills = [
  {
    category: "Core",
    title: "Languages & Frameworks",
    tags: ["JavaScript ES6+", "TypeScript", "React.js", "Next.js", "React Native", "C++", "Python"],
  },
  {
    category: "Immersive",
    title: "3D & Animation",
    tags: ["Three.js", "GSAP", "WebGL", "Camera Controls", "Model Animation"],
  },
  {
    category: "Architecture",
    title: "State & Routing",
    tags: ["Zustand", "React Router", "App Router", "Context API"],
  },
  {
    category: "Interface",
    title: "Styling & UI Systems",
    tags: ["Tailwind CSS", "Shadcn UI", "Chakra UI", "Styled Components", "CSS Modules"],
  },
  {
    category: "Tooling",
    title: "Dev Tools & Backend",
    tags: ["Git / GitHub", "Appwrite", "Chrome DevTools", "Performance Opt.", "Mobile-First"],
  },
];

export const experiences = [
  {
    date: "APR 2023 - MAY 2024",
    role: "Front-End Developer",
    company: "droplinked / Contract · Remote",
    items: [
      "Built responsive, componentized UIs using React and Tailwind CSS with accessible markup and mobile-first layouts.",
      "Implemented interactive 3D product viewers with Three.js, including camera controls and smooth animations.",
      "Developed cross-platform mobile UI components in React Native integrated with Appwrite for auth and data.",
      "Collaborated with QA and stakeholders to triage issues and improve app performance and stability.",
      "Created reusable UI patterns and documentation to speed up feature development across projects.",
    ],
  },
  {
    date: "MAY 2024 - AUGUST 2024",
    role: "Front-End Developer",
    company: "Independent / Contract · Remote",
    items: [
      "Designed and developed a web-based dashboard to manage adviser-student interactions and track academic progress",
      "Implemented accounting and financial handling features, including balance tracking and results reporting",
      "Created data visualization components to display student results and financial summaries clearly and interactively.",
    ],
  },
  {
    date: "JAN 2025 - MAR 2025",
    role: "Front-End Developer",
    company: "Behkavan / Contract · Remote",
    items: [
      "Implemented a scalable feature-based front-end architecture for a stock market management dashboard using React, TypeScript, Vite, and Tailwind CSS.",
      "Built reusable UI components and dashboard layouts with shadcn/ui and Lucide React to support consistent, maintainable financial interfaces.",
      "Structured the application with dedicated modules for API services, routes, hooks, types, utilities, and feature-specific logic.",
      "Developed responsive dashboard views for managing stock market workflows and presenting financial data in a clear, user-friendly format.",
      "Improved code maintainability and developer experience through TypeScript type safety, path aliases, ESLint configuration, and organized project structure.",
    ],
  },
];

export const projects = [
  {
    number: "001",
    title: "3D Product Viewer",
    description:
      "Interactive 3D product model viewer with model rotation, zoom, and camera animation for intuitive product inspection and exploration.",
    stack: ["React", "Three.js", "WebGL", "GSAP"],
    href: "https://tshirt-viewer.netlify.app/",
  },
  {
    number: "002",
    title: "Student Adviser Dashboard",
    description:
      "Web-based platform managing adviser-student interactions and academic progress, with accounting features, balance tracking, and interactive data visualizations.",
    stack: ["React", "Tailwind CSS", "Zustand", "Data Viz"],
    href: "https://github.com/EhsanKinux/deltakonkur",
  },
  {
    number: "003",
    title: "UniVerse University Management System",
    description:
      "Next.js PWA university management platform designed to centralize academic workflows, student services, and administrative interactions in a modern web application.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWA"],
    href: "https://github.com/EhsanKinux/UniVerse",
  },
  {
    number: "004",
    title: "3D T-Shirt Viewer",
    description:
      "3D T-shirt customization viewer with multi-position logo placement, real-time model rendering, and interactive product preview controls.",
    stack: ["React", "Vite", "Three.js", "React Three Fiber", "Drei", "Valtio"],
    href: "https://github.com/EhsanKinux/3d-tshirt-viewer",
  },
  {
    number: "005",
    title: "Interactive 3D Art Gallery",
    description:
      "Immersive 3D art gallery featuring paintings and sketches, smooth horizontal navigation, realistic lighting, shadows, animated spotlights, and post-processing effects.",
    stack: ["React", "Three.js", "React Three Fiber", "Drei", "Postprocessing"],
    href: "https://github.com/EhsanKinux/art-gallery-3d",
  },
  {
    number: "006",
    title: "3D Art Gallery CRA",
    description:
      "Create React App based 3D gallery experience using Three.js and interactive object handling to display artworks inside a navigable virtual environment.",
    stack: ["React", "Create React App", "Three.js", "Three Interactive", "Tailwind CSS"],
    href: "https://github.com/EhsanKinux/3d-art-gallery-cra",
  },
  {
    number: "007",
    title: "React Spline 3D Scene",
    description:
      "React application integrating an interactive Spline 3D scene, demonstrating how exported Spline models can be embedded and rendered inside a modern Vite project.",
    stack: ["React", "Vite", "Spline", "Three.js"],
    href: "https://github.com/EhsanKinux/ReactSpline",
  },
  {
    number: "008",
    title: "OpenGL Triangle Renderer",
    description:
      "Simple C++ OpenGL renderer that demonstrates GPU-based triangle rendering using shaders, vertex buffers, and low-level graphics pipeline concepts.",
    stack: ["C++", "OpenGL", "GLEW", "GLFW", "Shaders"],
    href: "https://github.com/EhsanKinux/CPP_OpenGL_Shaders",
  },
  {
    number: "009",
    title: "Konva T-Shirt Designer",
    description:
      "2D T-shirt design tool that lets users upload logos, change shirt colors, preview placement, and detect the logo position on a customizable T-shirt canvas.",
    stack: ["React", "Konva.js", "React Konva", "Tailwind CSS", "Valtio"],
    href: "https://github.com/EhsanKinux/konva-tshirt-designer",
  },
  {
    number: "010",
    title: "Snake and Ladders C++ Game",
    description:
      "Data Structure course final project implementing a Snake and Ladders game in C++ with separated game, player, dice, and display logic.",
    stack: ["C++", "OOP", "Data Structures", "Visual Studio"],
    href: "https://github.com/EhsanKinux/SnakeAndLaddersCPP",
  },
];

export const languages = [
  { name: "Persian", level: 100 },
  { name: "English", level: 70 },
  { name: "Korean", level: 30 },
  { name: "Chinese", level: 10 },
];

export const education = [
  {
    degree: "B.Sc. Computer Engineering",
    school: "Hamedan University of Technology",
    info: "Expected 2026 · Core subjects: Data Structures, Algorithms, Web Development, Networks, SQL Databases, Computer Vision with Matlab · Programming: C/C++, Java, Python",
  },
  {
    degree: "Front-End Bootcamp",
    school: "Intensive Training Program",
    info: "2022-2023 · 80+ hours · Focused on JavaScript, React, and UI Design · Built multiple projects including responsive web apps",
  },
  {
    degree: "Quantum Machine Learning",
    school: "AriaQuanta",
    info: "Oct 2025 - Dec 2025 · Certificate of participation in comprehensive course on Quantum Machine Learning · Hands-on exposure to quantum algorithms and ML integration",
  },
  {
    degree: "Quantum Computing and Algorithms",
    school: "AriaQuanta",
    info: "Feb 2025 - Mar 2025 · Certificate of participation in comprehensive course on Quantum Computing and Algorithms · Learned fundamentals of quantum gates, circuits, and algorithm design",
  },
];

export const contactLinks = [
  { href: "mailto:ehsankhwentao@gmail.com", icon: "&#9993;", label: "Email" },
  { href: "https://github.com/EhsanKinux", icon: "&#8997;", label: "GitHub", external: true },
  {
    href: "https://www.linkedin.com/in/ehsan-khodaveysi-1a61a71b6",
    icon: "in",
    label: "LinkedIn",
    external: true,
  },
  { href: "tel:+989182166128", icon: "&#9742;", label: "Phone" },
];
