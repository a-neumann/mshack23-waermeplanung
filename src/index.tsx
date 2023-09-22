import { render } from "react-dom";

render(
    <h1>MS HACK 2023</h1>,
    document.getElementById("app")
);

try {
    if (!window.location.hostname.includes("github.io")) {
        new EventSource("/esbuild").addEventListener("change", () => location.reload())
    }
} catch (e) {
    // noop
}