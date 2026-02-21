import {
  LocationProvider,
  Router,
  hydrate,
  prerender as ssr,
} from "preact-iso";
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
    <LocationProvider>
      <div class="qr-app">
        <Toolbar onOpenMenu={() => setShowModeSwitcher(true)} />
        <Router>
          <Interface
            path="/:mode?"
            showModeSwitcher={showModeSwitcher}
            setShowModeSwitcher={setShowModeSwitcher}
          />
        </Router>
        <Footer
          onShowHelp={() => setShowHelp(true)}
          showHelp={showHelp}
          onHideHelp={() => setShowHelp(false)}
        />
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
