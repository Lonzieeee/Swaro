// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar     from "./components/common/Navbar";
import Footer     from "./components/common/Footer";
import Home       from "./pages/Home";
import About      from "./pages/About";
import Approach   from "./pages/Approach";
import WhyUs      from "./pages/WhyUs";
import Partnerships from "./pages/Partnerships";
import Contact    from "./pages/Contact";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: "72px" }}>
        <Routes>
          <Route path="/"             element={<Home />}         />
          <Route path="/about"        element={<About />}        />
          <Route path="/approach"     element={<Approach />}     />
          <Route path="/why-us"       element={<WhyUs />}        />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/contact"      element={<Contact />}      />
        </Routes>
      </main>
      <Footer />
    </>
  );
}