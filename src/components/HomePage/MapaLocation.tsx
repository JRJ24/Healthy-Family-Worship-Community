import { useEffect, useRef } from "react";
import Map, { type MapRef, Marker } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import './../../css/map.css'; 

const MapLocation = () => {
	const mapRef = useRef<MapRef | null>(null);
	const tokenMapBox = import.meta.env.VITE_API_kEY_MAPBOX;
	const link = import.meta.env.VITE_LINK_DIRECTION;
	useEffect(() => {
		const t = setTimeout(() => {
			mapRef.current?.getMap().resize();
		}, 600);
		return () => clearTimeout(t);
	}, []);

	return (
		<section id="location" className="location">
			{/* COLUMNA 1: INFORMACIÓN (A la izquierda para lectura visual) */}
			<motion.div
				className="location-info location-card"
				initial={{ opacity: 0, x: -30 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<h3 className="titleMap">Nuestra <span>Ubicación</span></h3>
				<p className="descriptionMap">
					Un espacio diseñado para conectar, adorar y crecer juntos. 
					Te esperamos con los brazos abiertos en nuestra casa.
				</p>

				<div className="details-container">
					{/* Item Dirección */}
					<div className="detail-item">
						<div className="icon-box">📍</div>
						<div className="detail-text">
							<h4>Dirección</h4>
							<p>C. José Francisco Castellano 53, Santo Domingo Este 11512</p>
						</div>
					</div>
				</div>

				<a href={link} target="_blank" rel="noreferrer" className="btn-location">
					Cómo llegar →
				</a>
			</motion.div>

			{/* COLUMNA 2: MAPA */}
			<motion.div
				initial={{ opacity: 0, x: 30 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, delay: 0.2 }}
				style={{
					height: 500,
					width: "100%",
					overflow: "hidden",
					borderRadius: "24px",
					boxShadow: "0 20px 40px -5px rgba(0,0,0,0.15)", 
					position: "relative"
				}}
			>
				<Map
					ref={mapRef}
					mapboxAccessToken={tokenMapBox}
					initialViewState={{
						longitude: -69.82555091313014,
						latitude: 18.514045097271765,
						zoom: 18,
					}}
					style={{ width: "100%", height: "100%" }}
					mapStyle="mapbox://styles/mapbox/light-v11" /* Estilo LIGHT queda mejor con tu web */
					mapLib={mapboxgl}
					onLoad={() => {
						mapRef.current?.getMap().resize();
					}}
					scrollZoom={false}
					boxZoom={false}
					dragRotate={false}
					dragPan={false}
					keyboard={false}
					doubleClickZoom={false}
					touchZoomRotate={false}
				>
					<Marker longitude={-69.82555091313014} latitude={18.514045097271765} anchor="bottom" >
						<img src="./Pin.png" />
					</Marker>
				</Map>
			</motion.div>
		</section>
	);
};

export default MapLocation;