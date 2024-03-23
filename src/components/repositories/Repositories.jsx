import { RepositoryCard } from "./RepositoryCard";
import { Profile } from '../profile/Profile';
import { useUserStore } from "../store/repositoriesStore";
import './repositories.css';
import { useEffect } from 'react';

export function Repositories() {
  const { userData, setUserData, selectedRepos, repositories, setRepositories, setSelectedRepos } = useUserStore((state) => state);

  useEffect(() => {
    setSelectedRepos('pinned');
  }, []);

  useEffect(() => {
    console.log(selectedRepos);
  }, [selectedRepos]);

  const handleClick = (filter) => {
    setSelectedRepos(filter);
  }


  return (
    <div>
      <Profile data={userData} />
      {repositories && (
        <div className='repositories'>
          <div className='button-container'>
            <button className={selectedRepos === 'pinned' ? 'active': ''} onClick={() => handleClick('pinned')}>Fijados</button>
            <button className={selectedRepos === 'all' ? 'active': ''} onClick={() => handleClick('all')}>Todos</button>
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
    </div>
  )
}