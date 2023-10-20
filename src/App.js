
import './App.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Header/Header';


function App() {
  return (
   <Router>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
    </Routes>
   </Router>
  );
}

export default App;