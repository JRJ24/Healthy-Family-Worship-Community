// import { useEffect, useState } from "react";
import Header from './../components/Header.tsx';
import CarrouselCAFSA from './../components/HomePage/CarrouselCAFSA.tsx';
import Background from './../components/Background.tsx';
import AboutUs from './../components/HomePage/AboutUs.tsx';
import MapLocation from './../components/HomePage/MapaLocation.tsx';
import Footer from './../components/Footer.tsx';
import cafsaMain from './../../public/CAFSA.svg';
import cafsaBookClub from './../../public/BookClub.png';

const images = [
  cafsaMain,
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  cafsaBookClub,
];

const text = [
  "Comunidad de Adoracion Familia Saludable",
  "Servicios",
  "Estudios biblicos",
  "Club de lectura",
]


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Background bgVariant={"linear"} />
      <Header />
      <CarrouselCAFSA imgs={images} texts={text} />
      <AboutUs />
      <MapLocation />
      <Footer />
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