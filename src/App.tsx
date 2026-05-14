// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar     from "./components/common/Navbar";
import Footer     from "./components/common/Footer";
import Home       from "./pages/Home";
import About      from "./pages/About";
import LeadConsultantProfilePage from "./pages/LeadConsultantProfilePage";
import Services   from "./pages/Services";
import Approach   from "./pages/Approach";
import WhyUs      from "./pages/WhyUs";
import Partnerships from "./pages/Partnerships";
import Contact    from "./pages/Contact";
import CounsellingBooking from "./pages/CounsellingBooking";
import CounsellingServicePage from "./pages/CounsellingServicePage";
import CounsellingServiceDetailPage from "./pages/CounsellingServiceDetailPage";
import ScrollToTop from "./components/common/ScrollToTop";
import SupportChatWidget from "./components/common/SupportChatWidget";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: "72px" }}>
        <Routes>
          <Route path="/"             element={<Home />}         />
          <Route path="/about/:slug"  element={<LeadConsultantProfilePage />} />
          <Route path="/about"        element={<About />}        />
          <Route path="/services/*"   element={<Services />}     />
          <Route path="/approach"     element={<Approach />}     />
          <Route path="/why-us"       element={<WhyUs />}        />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/contact"      element={<Contact />}      />
          <Route path="/book-session" element={<CounsellingBooking />} />
          <Route path="/course-overview/:slug" element={<CounsellingServicePage />} />
          <Route path="/counselling-services/:slug" element={<CounsellingServiceDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <SupportChatWidget />
    </>
  );
}