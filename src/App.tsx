import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main>
      <p>Header</p>
      <h1 className="text-2xl bg-green-500">Bhojjo</h1>
      <Outlet />
      <p>Footer</p>
    </main>
  );
}

export default App;
