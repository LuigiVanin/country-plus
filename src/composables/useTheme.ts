export const useTheme = () => {
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set() {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
  });

  return {
    isDark,
    toggleTheme: () => (isDark.value = !isDark.value),
  };
};
