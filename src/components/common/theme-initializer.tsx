export function ThemeInitializer() {
  const code = `
    (function () {
      try {
        var raw = localStorage.getItem("app-theme-storage");
        var theme = "angel";
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && parsed.state && parsed.state.theme) {
            theme = parsed.state.theme;
          }
        }
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "angel");
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
