import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
interface props {
  childrean: React.ReactNode;
}
const Layout = ({ childrean }: props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container max-auto py-10 flex-1">{childrean}</div>

      <Footer />
    </div>
  );
};

export default Layout;
