import { render } from "preact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Interface from "./components/Interface/Interface";
import Footer from "./components/Footer/Footer";

import { useState } from "preact/hooks";

export function App() {
  const [showModeSwitcher, setShowModeSwitcher] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div class="qr-app">
      <Toolbar onOpenMenu={() => setShowModeSwitcher(true)} />
      <Interface
        showModeSwitcher={showModeSwitcher}
        setShowModeSwitcher={setShowModeSwitcher}
      />
      <Footer
        onShowHelp={() => setShowHelp(true)}
        showHelp={showHelp}
        onHideHelp={() => setShowHelp(false)}
      />
    </div>
  );
}

render(<App />, document.getElementById("app"));
