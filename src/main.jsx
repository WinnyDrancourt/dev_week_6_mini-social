import React from "react";
import { createRoot } from "react-dom/client";
/*import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";*/
import { Provider } from "jotai";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/general/routes";
import Navbar from "./components/general/navbar";
import "./style/main.css";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>*/}
    <Provider>
      <App />
    </Provider>
    {/*</PersistGate>
    </Provider>*/}
  </React.StrictMode>,
);
