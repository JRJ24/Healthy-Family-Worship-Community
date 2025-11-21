import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown, FaBookOpen, FaBookReader, FaPlaceOfWorship } from 'react-icons/fa';
import { PiVirtualRealityBold } from "react-icons/pi";
import logoIcon from "./../assets/cafsaLogo.webp";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Briefcase, Info, Map} from "lucide-react";
import './../css/header.css';

// 1. Definimos la interfaz para TypeScript
interface NavItem {
  title: string;
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
      title: "",
      section: "aboutus",
      path: "/",
      icon: <Home />,
    },
    {
      title: "SERVICES",
      section: "services", // Corregí "section" a "services" para que tenga sentido semántico
      path: "/",
      children: [
        { title: "SATURDAY YOUTH", section: "Saturdayyouth", path: "/" },
        { title: "SUNDAY MORNING", section: "sundaymorning", path: "/" },
        { title: "SUNDAY NIGHT", section: "sundaynight", path: "/" }
      ]
    },
    {
      title: "CAFSA MINISTRY",
      section: "cafsaministry",
      path: "/",
      children: [
        { title: "Book club", section: "bookclub", path: "/", icon: <FaBookOpen /> },
        { title: "Bible studies", section: "biblestudies", path: "/", icon: <FaBookReader /> },
        { title: "Virtual Evangelism", section: "virtualevangelism", path: "/", icon: <PiVirtualRealityBold /> },
        { title: "Worship rehearsals", section: "worshiprehearsals", path: "/", icon: <FaPlaceOfWorship /> }
      ]
    },
    {
      title: "LOCATION",
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
  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 0 }}
      animate={controls} // IMPORTANTE: Usar 'controls' aquí, no un objeto fijo
      className="header " 
    >

      <div className="brand">
        <img src={logoIcon} alt="CAFSA" className="logo"/>
      </div>
      
      
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }} // Reset básico
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Navegación */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`} >
        <ul className="flex items-center gap-5 list-none m-0 p-0">
          {buttonsHeader.map((item, index) => {
            return (
              <li key={index} style={{ position: 'relative' }}>
              {/* Si tiene hijos, renderizamos lógica de Dropdown */}

              {item.children ? (
                <div 
                  className="dropdown-wrapper"
                  onMouseEnter={() => !menuOpen && setActiveDropdown(item.title)} // Hover en Desktop
                  onMouseLeave={() => !menuOpen && setActiveDropdown(null)}
                >
                  <button 
                    onClick={() => toggleDropdown(item.title)}
                    className="flex items-center gap-[5px] text-base font-medium bg-transparent border-none cursor-pointer"
                  >
                    {item.icon}
                    {item.title} 
                    <motion.span animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}>
                      <FaChevronDown size={12}/>
                    </motion.span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.children.map((child, cIndex) => (
                          <li key={cIndex} className="w-full">
                            <a 
                              href={`#${child.section}`} 
                              onClick={() => setMenuOpen(false)}
                            >
                              {/* Contenedor del icono para asegurar tamaño constante */}
                              <span className="text-lg text-purple-400 flex-shrink-0">
                                {child.icon}
                              </span>
                              
                              {/* El texto */}
                              <span>{child.title}</span>
                            </a>
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
                  {item.title}
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