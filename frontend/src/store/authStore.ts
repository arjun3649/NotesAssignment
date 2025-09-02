import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        token: null,
        login: (token: string) => {
          localStorage.setItem('token', token);
          set({ isAuthenticated: true, token });
        },
        logout: () => {
          localStorage.removeItem('token');
          set({ isAuthenticated: false, token: null });
        },
      }),
      {
        name: 'auth-storage', // name of the item in the storage (must be unique)
      }
    )
  )
);

export default useAuthStore;
