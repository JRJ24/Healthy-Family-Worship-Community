import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronDown } from 'react-icons/fa'; // Eliminé íconos no usados para limpiar
import logoIcon from "./../assets/cafsaLogo.webp";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import './../css/header.css';

// 1. Definimos la interfaz para TypeScript
interface NavItem {
  title: string;
  section: string;
  path: string;
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
      title: "About CAFSA",
      section: "aboutus",
      path: "/",
    },
    {
      title: "Services",
      section: "services", // Corregí "section" a "services" para que tenga sentido semántico
      path: "/",
      children: [
        { title: "Saturday youth", section: "Saturdayyouth", path: "/" },
        { title: "Sunday Morning", section: "sundaymorning", path: "/" },
        { title: "Sunday Night", section: "sundaynight", path: "/" }
      ]
    },
    {
      title: "CAFSA ministry",
      section: "cafsaministry",
      path: "/",
      children: [
        { title: "Book club", section: "bookclub", path: "/" },
        { title: "Bible studies", section: "biblestudies", path: "/" },
        { title: "Virtual Evangelism", section: "virtualevangelism", path: "/" },
        { title: "Worship rehearsals", section: "worshiprehearsals", path: "/" }
      ]
    },
    {
      title: "Location",
      section: "location",
      path: "/"
    }
  ];

	useEffect(() => {
    // 1. FORZAR LA APARICIÓN AL CARGAR
    controls.start({ y: 0, opacity: 1 }); 

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // ... tu lógica de scroll existente ...
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
      className="header" 
      // Estilos sugeridos para que funcione el layout (puedes moverlos a tu CSS)
      style={{ 
        position: 'fixed', top: 0, width: '100%', zIndex: 50, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
      }}
    >
      <div className="brand">
        <img src={logoIcon} alt="CAFSA" className="logo"  />
      </div>
      
      {/* Botón Móvil */}
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
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, alignItems: 'center' }}>
          {buttonsHeader.map((item, index) => (
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
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1rem', fontWeight: 500 }}
                  >
                    {item.title} 
                    <motion.span animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}>
                      <FaChevronDown size={12}/>
                    </motion.span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="dropdown-menu"
                        style={{
                          position: menuOpen ? 'relative' : 'absolute', // Relativo en móvil, absoluto en desktop
                          top: menuOpen ? 0 : '100%',
                          left: 0,
                          background: 'white',
                          padding: '10px',
                          boxShadow: menuOpen ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
                          borderRadius: '8px',
                          minWidth: '180px',
                          listStyle: 'none'
                        }}
                      >
                        {item.children.map((child, cIndex) => (
                          <li key={cIndex} style={{ margin: '8px 0' }}>
                            <a 
                              href={`#${child.section}`} 
                              className="smooth-btn"
                              onClick={() => setMenuOpen(false)} // Cerrar menú al hacer click
                              style={{ textDecoration: 'none', color: '#333', fontSize: '0.9rem' }}
                            >
                              {child.title}
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
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

export default Header;