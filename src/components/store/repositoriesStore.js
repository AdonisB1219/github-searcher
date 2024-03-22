import {create} from 'zustand';

export const useUserStore = create ( (set) => ({
    userData: null,
    selectedRepos: "",
    repositories: null,
    setUserData: (userData) => set({ userData }),
    setSelectedRepos: (selectedRepos) => set({ selectedRepos }),
    setRepositories: (repositories) => set({ repositories }),
}))