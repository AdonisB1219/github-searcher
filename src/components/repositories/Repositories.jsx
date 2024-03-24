import { RepositoryCard } from "./RepositoryCard";
import { Profile } from '../profile/Profile';
import { useUserStore } from "../store/repositoriesStore";
import './repositories.css';
import { useEffect } from 'react';
import { fetchRepositories, paginatedRepositories } from '../../services/graphql-api';


export function Repositories() {
  const { userData, currentPage, selectedRepos, repositories, repoPageInfo, setRepositories, setSelectedRepos, setCurrentPage, setRepoPageInfo } = useUserStore((state) => state);

  async function updateRepos(){
    let repositories= (await fetchRepositories(userData?.login, selectedRepos));
    setRepositories(repositories?.nodes);
    if(selectedRepos != 'pinned'){
      setRepoPageInfo(repositories?.pageInfo);
    }
  }

  async function getPageRepos(direction){
    console.log("GET PAGE REPOS");
    console.log(direction);
    let cursor = direction == 'after' ? repoPageInfo.endCursor : repoPageInfo.startCursor;
    console.log(cursor);
    let repos = await paginatedRepositories(userData?.login, selectedRepos, cursor, direction);
    setRepositories(repos?.repositories?.nodes);
    setRepoPageInfo(repos?.repositories?.pageInfo);
    console.log(repos);
  }

  useEffect(() => {
    updateRepos();
    console.log(repoPageInfo);
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
          {(selectedRepos != 'pinned') ? (<>
          <div className="pagination">
          <button 
          disabled={repoPageInfo?.hasPreviousPage ? false : true}
          onClick={ () => {getPageRepos('before')}}>Anterior</button>

          <button 
          disabled={repoPageInfo?.hasNextPage ? false : true}
          onClick={() => {getPageRepos('after')}}
          style={{
            color: repoPageInfo?.hasNextPage ? 'var(--color-contrast)':'gray',
            cursor: repoPageInfo?.hasNextPage ? 'pointer' : 'not-allowed',
          }}>Siguiente</button>
          </div>
          </>) : 
          (<></>)}
        </div>
      )}
      {(repositories && repositories.length == 0 && selectedRepos == 'all') ? <h1 className="repositories">Aún no hay repositorios en esta cuenta.</h1> : null }
    </div>
  )
}

//TODO CORREGIR BUG EN BOTONES DE PAGINACION, A VECES SE DESHABILITAN.