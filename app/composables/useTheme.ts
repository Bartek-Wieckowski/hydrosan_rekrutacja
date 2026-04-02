export const useTheme = () => {
  const isDark = useState<boolean>("theme", () => false);

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const init = () => {
    isDark.value = localStorage.getItem("theme") === "dark";
    apply(isDark.value);
  };

  const toggle = () => {
    document.documentElement.classList.add("theme-switching");
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    apply(isDark.value);
    setTimeout(
      () => document.documentElement.classList.remove("theme-switching"),
      400,
    );
  };

  return { isDark, init, toggle };
};
