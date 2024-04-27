export const productsMenu = {
  title: "Products",
  items: [
    {
      item: "SMART HOME AUTOMATION LIGHTING",
      link: "/products/categories/smart_home_automation_lighting",
    },
    {
      item: "DOOR BELLS & ACCESS CONTROL",
      link: "/products/categories/door_bells_and_access_control",
    },
    {
      item: "ALEXA VOICE ASSISTANT",
      link: "/products/categories/alexa_voice_assistant",
    },
    {
      item: "SMART DETECTORS AND SENSORS",
      link: "/products/categories/smart_detectors",
    },
    {
      item: "CAMERA LIST AND SPECIFICATIONS",
      link: "/products/categories/camera_list_and_specifications",
    },
    {
      item: "SMART LOCKS",
      link: "/products/categories/smart_locks",
    },
  ],
};
export const solutionsMenu = {
  title: "Solutions",
  items: [
    {
      item: "Smart Home",
      link: "#",
    },
    {
      item: "Home Security",
      link: "#",
    },
    {
      item: "Industrial Application",
      link: "#",
    },
    {
      item: "Smart Ambient Light",
      link: "#",
    },
  ],
};
export const supportMenu = {
  title: "Support",
  items: [
    {
      item: "Brochures",
      link: "#",
    },
    {
      item: "Manuals",
      link: "#",
    },
    {
      item: "Videos",
      link: "#",
    },
    {
      item: "Events",
      link: "#",
    },
  ],
};
export const menuItems = [
  { title: "Home", isDropdown: false, link: "/", items: [] },
//   { ...productsMenu, isDropdown: true },
//   { ...supportMenu, isDropdown: true },
  { title: "Login", isDropdown: false, link: "/auth/login", items: [] },
  { title: "Sign up", isDropdown: false, link: "/auth/register", items: [] },
];

export const dashboardMenuItems = [
  { title: "Home", isDropdown: false, link: "/", items: [] },
  { title: "Dashboard", isDropdown: false, link: "/dashboard", items: [] },
  { title: "Terms", isDropdown: false, link: "/dashboard/terms", items: [] },
  { title: "Classes", isDropdown: false, link: "/dashboard/classes", items: [] },
  { title: "Exams", isDropdown: false, link: "/dashboard/exams", items: [] },
  { title: "Tasks", isDropdown: false, link: "/dashboard/tasks", items: [] },
  // { title: "Exams", isDropdown: false, link: "/dashboard/exams", items: [] },
  { title: "Study Preference", isDropdown: false, link: "/dashboard/study-preference", items: [] },
  // { title: "Exams", isDropdown: false, link: "/dashboard/exams", items: [] },
  // { title: "Tasks", isDropdown: false, link: "/dashboard/tasks", items: [] },
  // { title: "Classes", isDropdown: false, link: "/dashboard/classes", items: [] },
]
