export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "QuesNest",
  description: "A platform for dumping qustions and genreating quizes.",
  navItems: [
    {
      label: "Explore",
      href: "/explore",
    },
    {
      label: "Blogs",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/SayanDasDev/quesnest",
  },
};
