import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
// import ProductsDetails from "./pages/ProductDetails";
import NotFoundPage from "./pages/NotFoundPage";
import LoginRegister from "./pages/Login&Register";
import './css/globals.css';

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegister />} />
        {/* <Route path="/products/:id" element={<ProductsDetails />} />
        <Route path="/products" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;