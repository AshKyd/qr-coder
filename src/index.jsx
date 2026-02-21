import { render } from "preact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Interface from "./components/Interface/Interface";
import Footer from "./components/Footer/Footer";

export function App() {
  return (
    <div class="qr-app">
      <Toolbar />
      <Interface />
      <Footer />
    </div>
  );
}

render(<App />, document.getElementById("app"));
