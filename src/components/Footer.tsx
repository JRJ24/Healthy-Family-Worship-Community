import cafsa from './../../public/cafsa.png';
import './../css/footer.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='footer'>
			<div className='footer-container'>
				{/* Sección del Logo */}
				<div className='footer-section logo-section'>
					<img src={cafsa} alt="Logo CAFSA" className='footer-logo' />
				</div>

				<div className='footer-section links-section'>
					<h3>Redes Sociales</h3>
					<div className='social-links'>
						<a href="https://www.instagram.com/cafssa/" target='_blank' rel='noopener noreferrer' className='footer-link'>Instagram</a>
						<a href="https://www.facebook.com/share/1BcbMktMUZ/" target='_blank' rel='noopener noreferrer' className='footer-link'>Facebook</a>
					</div>
				</div>
			</div>

			{/* Barra inferior de Copyright */}
			<div className='footer-bottom'>
				<p>&copy; {currentYear} - Todos los derechos reservados.</p>
			</div>
		</footer>
	);
}

export default Footer;