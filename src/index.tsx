import { render } from "react-dom";
import App from "./App";

render(
    <App />,
    document.getElementById("app")
);

try {
    if (!window.location.hostname.includes("github.io")) {
        new EventSource("/esbuild").addEventListener("change", () => location.reload())
    }
} catch (e) {
    // noop
}