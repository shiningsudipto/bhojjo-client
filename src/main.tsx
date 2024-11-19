import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <RouterProvider router={router} />
        {/* </PersistGate> */}
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
