import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegisterTicket from "./pages/RegisterTicket";
import RegisterEntrance from "./pages/RegisterEntrance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register-ticket" element={<RegisterTicket />} />
        <Route path="/register-entrance" element={<RegisterEntrance />} />
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
