import { RepositoryCard } from "./RepositoryCard";
import { Profile } from '../profile/Profile';
import { useUserStore } from "../store/repositoriesStore";
import './repositories.css';
import { useEffect } from 'react';
import { fetchRepositories, fetchUserData } from '../../services/graphql-api';


export function Repositories() {
  const { userData, selectedRepos, repositories, setRepositories, setSelectedRepos } = useUserStore((state) => state);

  async function updateRepos(){
    setRepositories((await fetchRepositories(userData?.login, selectedRepos)).nodes);
  }

  useEffect(() => {
    console.log(selectedRepos);
    updateRepos();
  }, [selectedRepos]);

  useEffect(() => {
  }, [repositories]);

  const handleClick = (filter) => {
    setSelectedRepos(filter);
  }


  return (
    <div>
      <Profile />
      {repositories && repositories.length > 0 && (
        <div className='repositories'>
          <div className='button-container'>
            <button className={selectedRepos === 'pinned' ? 'active': ''} onClick={() => handleClick('pinned')}>Fijados</button>
            <button className={selectedRepos === 'all' ? 'active': ''} onClick={() => handleClick('all')}>Todos</button>
            <button className={selectedRepos === 'contributed-to' ? 'active': ''} onClick={() => handleClick('contributed-to')}>Contribuciones</button>
          </div>
          <ul>
            {repositories.map((repository, index) => (
              <li key={index}>
                <RepositoryCard repository={repository} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {(repositories && repositories.length == 0) ? <h1 className="repositories">Aún no hay repositorios en esta cuenta.</h1> : null }
    </div>
  )
}