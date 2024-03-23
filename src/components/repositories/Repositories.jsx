import { RepositoryCard } from "./RepositoryCard";
import { Profile } from '../profile/Profile';
import { useUserStore } from "../store/repositoriesStore";
import './repositories.css';
import { useEffect } from 'react';
import { fetchRepositories, fetchUserData } from '../../services/graphql-api';


export function Repositories() {
  const { userData, selectedRepos, repositories, setRepositories, setSelectedRepos } = useUserStore((state) => state);

  async function updateRepos(){
    setRepositories((await fetchRepositories(userData?.login, selectedRepos))?.nodes);
  }

  useEffect(() => {
    updateRepos();
    console.log(repositories);
  }, [selectedRepos]);

  useEffect(() => {
  }, [repositories]);

  const handleClick = (filter) => {
    setSelectedRepos(filter);
  }


  return (
    <div>
      <Profile />
      {repositories && ( repositories.length > 0 || (userData && selectedRepos != 'all')) && (
        <div className='repositories'>
          <div className='button-container'>
            <button className={selectedRepos === 'pinned' ? 'active': ''} onClick={() => handleClick('pinned')}>Fijados</button>
            <button className={selectedRepos === 'all' ? 'active': ''} onClick={() => handleClick('all')}>Todos</button>
            <button className={selectedRepos === 'contributed-to' ? 'active': ''} onClick={() => handleClick('contributed-to')}>Contribuciones</button>
          </div>
          <ul>
            { (repositories.length > 0) ? 
            (repositories.map((repository, index) => (
              <li key={index}>
                <RepositoryCard repository={repository} />
              </li>
            )))  :
            (<h2 className="no-repos">No hay repositorios en este apartado.</h2>)
          }
          </ul>
        </div>
      )}
      {(repositories && repositories.length == 0 && selectedRepos == 'all') ? <h1 className="repositories">Aún no hay repositorios en esta cuenta.</h1> : null }
    </div>
  )
}