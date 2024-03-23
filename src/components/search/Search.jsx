import { useUserStore } from '../store/repositoriesStore';
import { useState } from 'react';
import { fetchRepositories, fetchUserData } from '../../services/graphql-api';
import './search.css';

export function Search(){
    const { userData, setUserData, selectedRepos, repositories, repoPageInfo, setRepositories, error, setError, setSelectedRepos, setCurrentPage, setRepoPageInfo } = useUserStore((state) => state);
    const [searchValue, setSearchValue] = useState("");
  
    const fetchData = async (username) => {
      try {
        setCurrentPage(1);
        setError(false);
        let userData = await fetchUserData(username);
        setUserData(userData.user);
        setSelectedRepos('pinned');
        let repositories = await fetchRepositories(username, 'pinned');
        setRepositories(repositories?.nodes);
      } catch (e) {
        setUserData(null);
        setRepositories(null);
        setError(true);
        console.log(e);
      }
    }
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        fetchData(searchValue);
      }
    };
  
    const handleButtonClick = () => {
      fetchData(searchValue);
    };
    return (
        <>
        <input type="text" name="search" placeholder="Buscar..." onKeyDown={handleKeyPress} onChange={(e) => setSearchValue(e.target.value)} />
        <button className='search' onClick={handleButtonClick}> Buscar </button>
        </>
    )
}