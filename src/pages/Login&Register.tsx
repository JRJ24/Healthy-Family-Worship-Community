import { useState } from "react";
import http from "../API/methodsHttp";
import Login from "../components/Login&Register/Login";
import { useNavigate } from "react-router";
import LoginSucess from "../components/InformationModal/loginSuccess";
import { useAuthStore } from "../context/useAuthStore";
import useLoginUser from "../context/useLogin";

const Logiin = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onLoginSuccess = async (user: string, password: string) => {
    try {
      const payload = {
        user,
        password,
      };

      const response = await http.postApi("/api/users/login", payload);

      if (response.ok) {
        useAuthStore.setState({
          user: {
            data: response.user,
          },
        });

        setOpenModal(true);
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        useLoginUser.setState({ isLogging: true });
      }
      
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Login onLoginSuccess={onLoginSuccess} />

      <LoginSucess openModal={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Logiin;
