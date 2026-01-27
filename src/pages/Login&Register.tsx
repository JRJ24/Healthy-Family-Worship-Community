
import Login from "../components/Login&Register/Login"

const Logiin = () => {

  const onLoginSuccess = () => {
    console.log("Login successful!");
  }
  
  return (
    <div className="min-h-screen">
      <Login onLoginSuccess={onLoginSuccess}/>
    </div>
  );
} 

export default Logiin;