import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";

import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    
      <UserProvider>
        <AdminProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>

          <Footer />
        </AdminProvider>
      </UserProvider>
    
  );
}

export default App;
