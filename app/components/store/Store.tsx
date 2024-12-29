/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from 'zustand';



const useStore = create((set:any) => ({
  isLoggedIn: false,
  isAdmin: false,
  setIsLoggedIn: (loggedIn:any) => set(() => ({ isLoggedIn: loggedIn })),
  setIsAdmin: (isAdmin:any) => set(() => ({ isAdmin })),
}));

export default useStore;
