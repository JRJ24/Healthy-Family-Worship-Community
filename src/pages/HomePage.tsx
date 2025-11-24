// import { useEffect, useState } from "react";
import Header from './../components/Header.tsx';
import CarrouselCAFSA from './../components/HomePage/CarrouselCAFSA.tsx';
import Background from './../components/Background.tsx';
import AboutUs from './../components/HomePage/AboutUs.tsx';
import MapLocation from './../components/HomePage/MapaLocation.tsx';
import Footer from './../components/Footer.tsx';
import cafsaMain from './../../public/CAFSA.svg';

const images = [
  cafsaMain,
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const text = [
  "Comunidad de Adoracion Familia Saludable",
  "Servicios Dominicales",
  "Servicios juveniles",
  "Estudios biblicos",
  "Club de lectura",
  "Ensayos Ministeriales",
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