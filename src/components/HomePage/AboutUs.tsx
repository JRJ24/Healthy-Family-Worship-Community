import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../css/aboutus.css';
import AboutModal from './../InformationModal/AboutModal.tsx';

interface data {
  title: string;
  body: string;

}


const AboutUs = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const closeModal = () => setOpenModal(false);

  const information: data[] = [
    {
      title: "Comunidad de Adoracion Familia Saludable",
      body: "En Comunidad de Adoración Familia Saludable, nos dedicamos a fortalecer la fe y los lazos familiares a través de una vida de iglesia activa y constante. Ofrecemos servicios para todas las edades, comenzando con nuestros jóvenes los sábados y nuestras celebraciones dominicales en la mañana y noche (Jóvenes Adultos).",
    },
  ]

  // const handleButtomRedirect = () => {

  // }

  return (
    <section className="about-section" id="aboutus">
      <div className="container">
        {information.map((item, index) => (
          <motion.div key={index} className="grid-layout">
            
            {/* COLUMNA IZQUIERDA: TEXTO */}
            <div className="text-content">
              <span className="subtitle">Sobre Nosotros</span>
              <h1 className="main-title">
                {item.title} 
              </h1>
              <p className="description">
                {item.body}
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="cta-button">
                Ver horarios
              </button>
            </div>

            {/* COLUMNA DERECHA: VISUAL / CUADROS */}
            <div className="visual-content">
              <div className="box-lilac"></div>
              
              <div className="box-purple">
                <span className="brand-text">C A F S A</span>
              </div>

              <div className="box-stats">
                <span className="stat-number">+5</span>
                <span className="stat-label">Años Sirviendo</span>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {openModal && (
          <AboutModal 
            openModal={openModal} 
            onClose={() => setOpenModal(false)} 
          />
        )}
      </AnimatePresence>
    </section >
  );
}

export default AboutUs;