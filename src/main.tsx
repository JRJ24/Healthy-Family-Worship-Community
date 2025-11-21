import { createRoot } from 'react-dom/client'
import './index.css'
// import 'hero-slider/dist/index.css'; // estilos del paquete

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)