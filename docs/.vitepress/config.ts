import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Clawd Code — src map",
    description:
      "Navigable documentation for the mirrored TypeScript src/ tree (research mirror).",
    mermaid: {
      theme: "default",
    },
    themeConfig: {
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/introduction" },
        { text: "Architecture", link: "/architecture/overview" },
        { text: "Reference", link: "/reference/directory-map" },
      ],
      sidebar: {
        "/guide/": [
          {
            text: "Guide",
            items: [
              { text: "Introduction", link: "/guide/introduction" },
              { text: "Important notice", link: "/guide/notice" },
              { text: "Tech stack", link: "/guide/tech-stack" },
            ],
          },
        ],
        "/architecture/": [
          {
            text: "Architecture",
            items: [
              { text: "Overview", link: "/architecture/overview" },
              {
                text: "Execution (how it runs)",
                items: [
                  {
                    text: "Runtime & bootstrap",
                    link: "/architecture/runtime-bootstrap",
                  },
                  { text: "Query loop", link: "/architecture/query-loop" },
                  {
                    text: "Tool execution",
                    link: "/architecture/tool-execution",
                  },
                ],
              },
              { text: "Tools", link: "/architecture/tools" },
              { text: "Commands", link: "/architecture/commands" },
              { text: "Services", link: "/architecture/services" },
              { text: "Bridge", link: "/architecture/bridge" },
              { text: "Permissions", link: "/architecture/permissions" },
              { text: "Plugins & skills", link: "/architecture/plugins-skills" },
            ],
          },
        ],
        "/reference/": [
          {
            text: "Reference",
            items: [
              { text: "Directory map", link: "/reference/directory-map" },
              { text: "Key files", link: "/reference/key-files" },
              { text: "Feature flags", link: "/reference/feature-flags" },
              { text: "Design patterns", link: "/reference/design-patterns" },
              { text: "Generated src index", link: "/reference/src-index" },
            ],
          },
        ],
      },
      socialLinks: [],
      footer: {
        message:
          "Research mirror only — not affiliated with any named rights holder.",
      },
    },
  }),
);
