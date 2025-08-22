import {BrowserRouter,Route,Routes,} from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import  TakeTest  from "./pages/TakeTest";
import { Welcome } from "../src/pages/welcome";
import Dashboard from "./pages/dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/adminDashboard";

  const token = localStorage.getItem("token");
  let role = "user";
  if (token) {
    const decoded: any = JSON.parse(atob(token.split(".")[1])); 
    role = decoded.role;
  }

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/take-test" element={<TakeTest/>} />
          <Route path="/admin" element={<ProtectedRoute role={role} requiredRole="admin"><AdminDashboard /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App