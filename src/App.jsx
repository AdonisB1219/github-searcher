import { Profile } from './components/profile/Profile';
import { useState } from 'react';
import { fetchRepositories, fetchUserData } from './services/api';
import './App.css'
import { RepositoryCard } from './components/repositories/RepositoryCard';
import { useUserStore } from './components/store/repositoriesStore';

function App() {
  const {userData, setUserData} = useUserStore((state) => state);
  const [searchValue, setSearchValue] = useState("");
  const [repositories, setRepositories] = useState(null);



  const fetchData = async (username) => {
    try {
      let userData = await fetchUserData(username)
      setUserData(userData);
      let repositories = await fetchRepositories(username);
      setRepositories(repositories);
    } catch (e) {
      setUserData(null);
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
      <section className="search-container">
        <input type="text" name="search" placeholder="Buscar..." onKeyDown={handleKeyPress} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className='search' onClick={()=>handleButtonClick()}> Buscar </button>
      </section>
      <section className="profile">
        <div>
          <Profile data={userData} />
          <div className='repositories'>
            <ul>
            {
              (repositories) ? (repositories.map((repository, index) => (
<li key={index}><RepositoryCard repository={repository}/></li> 
              )) ) : null
            }
            </ul>
          </div>
        </div>

      </section>
    </>
  )
}

export default App;
