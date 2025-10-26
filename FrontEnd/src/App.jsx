// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PriceComparison from "./components/PriceComparison";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protected from "./pages/Protected";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Home Page */}
       <Route
          path="/"
          element={
            <>
              <Home />
              <PriceComparison />
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/protected" element={<Protected />} />

        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
