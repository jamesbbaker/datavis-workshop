// See https://observablehq.com/framework/config for documentation.
//
// GitHub Pages: https://<github-username>.github.io/<repo>/
// `base` must be "/<repo>/" only (matches the repo name, not your uni id).
// If your GitHub username is jb5069 and the repo is datavis-workshop:
//   https://jb5069.github.io/datavis-workshop/
export default {
  title: "Datavis Workshop",

  theme: "parchment",

  // Only the pages required for the workshop handout
  pages: [
    {
      name: "Workshop",
      pages: [
        { name: "Project Sketches", path: "/project" },
        { name: "Example report", path: "/example-report" }
      ]
    }
  ],

  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  root: "src",

  footer: "",

  base: "/datavis-workshop/"
};
