import { create } from 'zustand';

interface LoginUserState {
    isLogging: boolean;
}

const useLoginUser = create<LoginUserState>(() => ({
    isLogging: !!localStorage.getItem("token"),
}));

export default useLoginUser;