import './App.css';
import { Routes,Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/char/:id' element={<Detail />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
