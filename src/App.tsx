import { Outlet } from "react-router-dom";
import "./App.css";
import NavbarDefault from "./components/shared/Navbar";

function App() {
  return (
    <main>
      <NavbarDefault/>   
      <h1 className="text-2xl bg-green-500">Bhojjo</h1>
      <Outlet />
      <p>Footer</p>
    </main>
  );
}

export default App;
