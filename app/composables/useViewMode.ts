export type ViewMode = "list" | "grid";

export const useViewMode = () => {
  const mode = useState<ViewMode>("viewMode", () => "list");

  const init = () => {
    mode.value = (localStorage.getItem("viewMode") as ViewMode) || "list";
  };

  const set = (m: ViewMode) => {
    mode.value = m;
    localStorage.setItem("viewMode", m);
  };

  return { mode, init, set };
};
