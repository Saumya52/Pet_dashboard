import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('accessToken') !== null,
  login: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ isAuthenticated: false });
  },
}));