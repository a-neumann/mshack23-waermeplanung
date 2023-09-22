import { render } from "react-dom";

render(
    <h1>MS HACK 2023</h1>,
    document.getElementById("app")
);

try {
    new EventSource("/esbuild").addEventListener("change", () => location.reload())
} catch (e) {
    // noop
}