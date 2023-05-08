
import './App.css';
import Home from './Components/Home';
import SingleDog from './Components/SingleDog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
        <Route path='/' element={ <Home/>}> </Route>
        <Route path='/:name' element={ <SingleDog/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
