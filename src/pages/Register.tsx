import { useState } from "react";
import Register from "../components/Login&Register/Register";
import type { IUser } from "../types/IUser";
import methodsHttp from "./../API/methodsHttp";
import RegisterSuccess from "../components/InformationModal/registerSucess";
import RegisterFailed from "../components/InformationModal/registerFailed";

const Registerr = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalAdvertencia, setmodalAdvertencia] = useState<boolean>(false);

  const registerData = async (userRegister: IUser) => {
    const response = await methodsHttp.postApi(
      "/api/users/create",
      userRegister,
    );

    if (response.ok) {
      setOpenModal(true);
    }

    if (!response.ok) {
      setmodalAdvertencia(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const row = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const dataUser: IUser = {
      name: row.fullName,
      email: row.mail,
      username: row.username,
      password: row.password,
      birthdayDate: row.dateofbirth,
    };

    setUser(dataUser);

    if (user) {
      registerData(user);
    }
  };

  return (
    <div className="min-h-screen">
      <Register onSubmit={handleSubmit} />

      <RegisterSuccess
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />

      <RegisterFailed
        openModal={modalAdvertencia}
        onClose={() => setmodalAdvertencia(false)}
      />
    </div>
  );
};

export default Registerr;
