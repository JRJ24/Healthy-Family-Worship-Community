import { useEffect, useState } from "react";
import Header from './../components/Header.tsx';
import CarrouselCAFSA from './../components/CarrouselCAFSA.tsx';


const images = [
  "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const text = [
  "title 1",
  "title 2",
  "title 3",
  "title 4",
  "title 5",
  "title 6",
]


const HomePage = () => {
    return (
    <div className="min-h-screen">
      <Header/>
      <CarrouselCAFSA imgs={images} texts={text} />
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