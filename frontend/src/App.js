import './App.css';
import Signup from './Usercomponents/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProviderSignup from './ProviderComponents/ProviderSignup';
import Login from './Usercomponents/Login';
import {Navigate } from 'react-router-dom';
import Main from './Usercomponents/Main';
import Getproviders from './Usercomponents/Getproviders';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="*" element={<Navigate to="/login" />} />

      <Route path='/signup'  element={<Signup/>} ></Route>  
      <Route path='/login'  element={<Login/>} ></Route>  
      <Route path='/main'  element={<Main/>} ></Route>  

      <Route path='/provider/signup'  element={<ProviderSignup/>} ></Route>  
      
      <Route path='/providersnearyou'  element={<Getproviders/>} ></Route>  



</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
