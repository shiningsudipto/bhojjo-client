import { Outlet } from "react-router-dom";
import "./App.css";
import NavMenu from "./components/shared/NavMenu";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <main>
      <NavMenu />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
