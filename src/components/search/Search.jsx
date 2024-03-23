import { useUserStore } from '../store/repositoriesStore';
import { useState } from 'react';
import { fetchRepositories, fetchUserData } from '../../services/api';
import './search.css';

export function Search(){
    const { userData, setUserData, repositories, setRepositories, error, setError } = useUserStore((state) => state);
    const [searchValue, setSearchValue] = useState("");
  
  
  
    const fetchData = async (username) => {
      try {
        setError(false);
        let userData = await fetchUserData(username)
        setUserData(userData);
        let repositories = await fetchRepositories(username);
        setRepositories(repositories);
      } catch (e) {
        setUserData(null);
        setRepositories(null);
        setError(true);
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
        <button className='search' onClick={() => handleButtonClick()}> Buscar </button>
        </>
    )
}