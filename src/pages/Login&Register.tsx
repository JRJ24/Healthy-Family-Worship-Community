
import Login from "../components/Login&Register/Login"
import { useNavigate } from "react-router";

const Logiin = () => {

  const navigate = useNavigate();

  const onLoginSuccess = () => {
    console.log("Login successful!");
    navigate("/");
  }

  return (
    <div className="min-h-screen">
      <Login onLoginSuccess={onLoginSuccess}/>
    </div>
  );
} 

export default Logiin;