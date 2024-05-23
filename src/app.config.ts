export default defineAppConfig({
  ui: {
    primary: "indigo",
    notifications: {
      // Show toasts at the top right of the screen
      position: "bottom-0 top-auto ",
    },
    container: {
      // base: "mx-0",
    },
    table: {
      wrapper: "h-full ",
      thead: "sticky top-0 z-10",
      th: {
        base: "sticky top-0 m-0 ",
      },
    },
  },
});
