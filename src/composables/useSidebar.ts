const sidebar = ref(false);

export const useSidebar = () => {
  const toggleSidebar = () => (sidebar.value = !sidebar.value);
  const openSidebar = () => (sidebar.value = true);
  const closeSidebar = () => (sidebar.value = false);

  return {
    sidebar,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
};
