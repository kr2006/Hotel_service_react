import './App.css';
import Clients from './components/Clients';
import Header from './components/Header';

import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
}

export default App;
