import React from 'react';
import Map from 'react-map-gl/mapbox';
import { motion } from 'framer-motion';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapLocation = () => {
	const tokenMapBox = 'pk.eyJ1IjoidmVsdm8iLCJhIjoiY21pYzBsOWQwMDhndjJtcTU0bDdxM3pqeiJ9.hnBMpOBS6MW1qUv2AyL0Ew';

	return (
		<motion.div 
			id='location'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{ 
				height: 400, 
				width: 600, 
				overflow: 'hidden', 
				borderRadius: '12px',
				background: '#f2f2f2', 
				boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
				position: 'relative', // Necesario para que el hijo absoluto se posicione bien
			}}
		>
			<Map
				mapboxAccessToken={tokenMapBox}
				initialViewState={{
					longitude: -69.82564158552053,
					latitude: 18.514635578765358,
					zoom: 15
				}}
				// Aseguramos que ocupe todo el contenedor padre
				style={{ width: '100%', height: '100%' }}
				mapStyle="mapbox://styles/mapbox/streets-v12"
			/>
		</motion.div>
	);
}

export default MapLocation;