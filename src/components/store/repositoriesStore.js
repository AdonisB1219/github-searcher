import {create} from 'zustand';

export const useUserStore = create ( (set) => ({
    userData: null,
    selectedRepos: 'pinned',
    repositories: null,
    error: false,
    setUserData: (userData) => set({ userData }),
    setSelectedRepos: (selectedRepos) => set({ selectedRepos }),
    setRepositories: (repositories) => set({ repositories }),
    setError: (error) => set({ error }),
}));