import { Outlet } from "react-router-dom";
import "./App.css";
import NavMenu from "../src/components/shared/NavMenu.jsx";

function App() {
  return (
    <main>
      <NavMenu />
      <Outlet />
      <p>Footer</p>
    </main>
  );
}

export default App;
