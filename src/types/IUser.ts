export interface IUser {
  name: string | null,
  email: string,
  username: string,
  password: string,
  birthdayDate: string
}

export interface IRegisterSucess {
  openModal: boolean;
  onClose: () => void;
}