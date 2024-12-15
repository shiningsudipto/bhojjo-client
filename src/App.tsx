import { Outlet } from "react-router-dom";
import "./App.css";
import NavMenu from "./components/shared/NavMenu";
import Footer from "./components/shared/Footer";
import CartDrawer from "./components/shared/CartDrawer";

function App() {
  return (
    <main>
      <NavMenu />
      <Outlet />
      <Footer />
      <CartDrawer />
    </main>
  );
}

export default App;
