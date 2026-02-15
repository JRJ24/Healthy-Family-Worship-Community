import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  data: {
    id: string;
    name: string;
    email: string;
    birthdayDate: string;
    dateInit: string;
  };
}

interface AuthState {
  token: string | null;
  user: UserPayload | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"), 
  user: localStorage.getItem("token")
    ? jwtDecode<UserPayload>(localStorage.getItem("token")!)
    : null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode<UserPayload>(token);
      set({ token, user: decoded });
    } else {
      set({ token: null, user: null });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));