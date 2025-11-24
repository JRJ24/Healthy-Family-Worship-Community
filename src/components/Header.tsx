import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaBookOpen, FaBookReader, FaPlaceOfWorship } from 'react-icons/fa';
import { PiVirtualRealityBold } from "react-icons/pi";
import logoIcon from "./../assets/cafsaLogo.webp";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Map } from "lucide-react";
import { Link } from 'react-router-dom';

// import { createPortal } from 'react-dom';
import './../css/header.css';

// 1. Definimos la interfaz para TypeScript
interface NavItem {
  titulo: string;
  section: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}


const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lastScroll, setLastScroll] = useState<number>(0);
  // Estado para saber qué dropdown está abierto (útil para móviles o click)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 
  
  const controls = useAnimation();

  const buttonsHeader: NavItem[] = [
    {
      titulo: "",
      section: "aboutus",
      path: "/",
      icon: <Home />,
    },
    {
      titulo: "SERVICIOS",
      section: "services", // Corregí "section" a "services" para que tenga sentido semántico
      path: "/",
      children: [
        { titulo: "SABADO JUVENILES", section: "Saturdayyouth", path: "/" },
        { titulo: "SERVICIOS DOMINICALES", section: "sundaymorning", path: "/" },
        { titulo: "DOMINGO NOCTURNO", section: "sundaynight", path: "/" }
      ]
    },
    {
      titulo: "MINISTERIOS",
      section: "cafsaministry",
      path: "/",
      children: [
        { titulo: "CLUB DE LECTURA", section: "bookclub", path: "/", icon: <FaBookOpen /> },
        { titulo: "ESTUDIOS BIBLICOS", section: "biblestudies", path: "/", icon: <FaBookReader /> },
        { titulo: "EVANGELISMO VIRTUAL", section: "virtualevangelism", path: "/", icon: <PiVirtualRealityBold /> },
        { titulo: "ENSAYOS DE ADORACION", section: "worshiprehearsals", path: "/", icon: <FaPlaceOfWorship /> }
      ]
    },
    {
      titulo: "UBICACION",
      section: "location",
      path: "/",
      icon: <Map />,
    }
  ];

  useEffect(() => {
    controls.start({ y: 0, opacity: 1 }); 

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        // Bajando → ocultar navbar
        controls.start({
          y: -100,
          opacity: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        });
      } else {
        // Subiendo → mostrar navbar
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, controls]); // Asegúrate de tener las dependencias bien

  // Función para alternar dropdowns (especialmente útil en móvil)
  const toggleDropdown = (titulo: string) => {
    if (activeDropdown === titulo) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(titulo);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 0 }}
      animate={controls} // IMPORTANTE: Usar 'controls' aquí, no un objeto fijo
      className="header " 
    >

      <div className="brand">
        <img src={logoIcon} alt="CAFSA" className="logo" />
      </div>
      
      
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }} // Reset básico
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="menu-overlay"
          />
        )}
      </AnimatePresence>

      {/* Navegación */}
      <nav className={`nav-links ${menuOpen ? "active" : ""} `} >
        <ul className="flex items-center gap-5 list-none m-0 p-0">
          {buttonsHeader.map((item, index) => {
            return (
              <li key={index} style={{ position: 'relative' }}>
                {/* Si tiene hijos, renderizamos lógica de Dropdown */}

                {item.children ? (
                  <div 
                    className="dropdown-wrapper"
                    onMouseEnter={() => !menuOpen && setActiveDropdown(item.titulo)} // Hover en Desktop
                    onMouseLeave={() => !menuOpen && setActiveDropdown(null)}
                  >
                    <button 
                      onClick={() => toggleDropdown(item.titulo)}
                      className="flex items-center gap-[5px] text-base font-medium bg-transparent border-none cursor-pointer"
                    >
                      {item.icon}
                      {item.titulo} 
                      <motion.span animate={{ rotate: activeDropdown === item.titulo ? 180 : 0 }}>
                        <FaChevronDown size={12} />
                      </motion.span>
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.titulo && (
                        <motion.ul
                          initial={{ opacity: 0, y: -9, scale: 0.95, filter: "blur(1px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(1px)" }}
                          transition={{ type: "spring", stiffiness: 200, damping: 25, mass: 0.5 }}
                          className="dropdown-menu"
                        >
                          {item.children.map((child, cIndex) => (
                            <li key={cIndex} className="w-full">
                              <Link 
                                to={child.section}
                                onClick={() => setMenuOpen(false)}
                                className="dropdown-item"
                              >
                                {/* Contenedor del icono para asegurar tamaño constante */}
                                <span className="text-lg text-purple-400 flex-shrink-0">
                                  {child.icon}
                                </span>
                              
                                {/* El texto */}
                                <span>{child.titulo}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Si NO tiene hijos, es un link simple
                  <a
                    href={`#${item.section}`} 
                    className="smooth-btn"
                    onClick={() => setMenuOpen(false)}
                    style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}
                  >
                    {item.icon}
                    {item.titulo}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.header>
  );
}

export default Header;