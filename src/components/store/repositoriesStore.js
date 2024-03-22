import {create} from 'zustand';

export const useUserStore = create ( (set) => ({
    userData: null,
    selectedRepos: "",
    setUserData: (userData) => set({ userData }),
    setSelectedRepos: (selectedRepos) => set({ selectedRepos }),
}))