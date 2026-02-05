/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
// import methodsHttp from './../../API/methodsHttp.ts';
import type ISchedule from './../../types/schedules.ts';
import { FaSun } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { IoMdMoon } from "react-icons/io";
import { motion } from 'framer-motion';
import './../../css/modal.css'; // <--- IMPORTANTE: Importa el CSS que creamos arriba

interface aboutModalProps {
	openModal: boolean;
	onClose: () => void;
}

const AboutModal = ({ openModal, onClose }: aboutModalProps) => {

	const schedules: ISchedule[] = [
		{
			Day: 'Sábado',
			Hour: '5:00 PM',
			icon: <FaChildren />
		},
		{
			Day: 'Domingo',
			Hour: '10:00 AM',
			icon: <FaSun />
		},
		{
			Day: 'Domingo',
			Hour: '7:00 PM',
			icon: <IoMdMoon />
		},
	]
	
	if (!openModal) return null;

	useEffect(() => {
		if (openModal) {
			document.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = ""; 
				document.documentElement.style.overflow = "";
			};
		}
	}, [openModal]);

	return (
		// El overlay cubre toda la pantalla
		<motion.div 
			className="modal-overlay"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose} // Cierra si das click afuera
		>
			{/* El contenido del modal (evitamos que el click se propague al fondo) */}
			<motion.div 
				className="modal-content"
				initial={{ scale: 0.8, opacity: 0, y: 50 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.8, opacity: 0, y: 50 }}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
				onClick={(e) => e.stopPropagation()} 
			>
				
				{/* Encabezado Morado */}
				<div className="modal-header">
					<h3>Horarios</h3>
				</div>

				{/* Lista de Horarios */}
				<div className="modal-body">
					{schedules.map((item, index) => (
						<motion.div 
							key={index} 
							className="schedule-item"
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: index * 0.1 }}
						>
							<div className="icon-container">
								{item?.icon}
							</div>
							<div className="text-container">
								{item.Day} - {item.Hour}
							</div>
						</motion.div>
					))}
				</div>

				{/* Botón Cerrar */}
				<div className="modal-footer">
					<button
						type='button'
						onClick={onClose}
						className="close-button"
					>
						Cerrar
					</button>
				</div>

			</motion.div>
		</motion.div>
	);
}

export default AboutModal;