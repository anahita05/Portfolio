import Script from "next/script";

export function ThemeInitializer() {
  const code = `
    (function () {
      try {
        var raw = localStorage.getItem("app-theme-storage");
        var theme = "light";
        if (raw) {
          var parsed = JSON.parse(raw);
          var t = parsed && (parsed.state ? parsed.state.theme : parsed.theme);
          if (t === "light" || t === "dark" || t === "red") {
            theme = t;
          } else if (t === "angel") {
            theme = "light";
          } else if (t === "navy" || t === "noir") {
            theme = "dark";
          } else if (t === "pink") {
            theme = "red";
          }
        }
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
      }
    })();
  `;

  return <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: code }} />;
}
