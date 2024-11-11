import { render } from "preact";
import "./style.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Interface from "./components/Interface/Interface";

export function App() {
  return (
    <div class="qr-app">
      <Toolbar />
      <Interface />
    </div>
  );
}

render(<App />, document.getElementById("app"));
