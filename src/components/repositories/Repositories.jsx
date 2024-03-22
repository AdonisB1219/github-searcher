import { RepositoryCard } from "./RepositoryCard";
import {Profile} from '../profile/Profile';
import { useUserStore } from "../store/repositoriesStore";
import './repositories.css';

export function Repositories(){
    const { userData, setUserData, repositories, setRepositories } = useUserStore((state) => state);

    
    return(
    <div>
          <Profile data={userData} />
          {repositories && (
    <div className='repositories'>
      <div className='button-container'>
        <button className='active'>Fijados</button>
        <button>Todos</button>
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