import { useEffect, useState } from "react";
import Header from './../components/Header.tsx';

const HomePage = () => {
    return (
    <div className="min-h-screen">
      <Header/>

      {/*<div className={`${isMenuOpen ? "blur-sm pointer-events-none" : ""}`}>
      <HeroSliderBTS slides={slides} />

      <AboutUs />
      <Industries />
      <Services bgVariant="linear" />
      <Products /> */}
      {/* <ServiceDocs /> */}
      {/* <ContactUs />
      <Footer /> */}
      {/* </div> */}
    </div>
  );
}

export default HomePage;