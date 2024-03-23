import './App.css'
import { Repositories } from './components/repositories/Repositories';
import { Search } from './components/search/Search';

function App() {

  return (
    <>
      <section className="search-container">
        <Search />
      </section>
      <section className="user">
        <Repositories />
      </section>
    </>
  )
}

export default App;
