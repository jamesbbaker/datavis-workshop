// See https://observablehq.com/framework/config for documentation.
export default {
  title: "Gapminder Studio",

  theme: "parchment",

  pages: [
    {
      name: "Examples",
      pages: [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/example-dashboard" },
        { name: "Report", path: "/example-report" },
        { name: "Project Sketches", path: "/project" }
      ]
    }
  ],

  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  root: "src",

  footer: "Built with Observable Framework.",

  // Required for GitHub Pages when the site is served from /repo-name/ (not a user site).
  base: "/datavis-workshop/"
};
