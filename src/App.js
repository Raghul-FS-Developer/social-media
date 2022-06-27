import {Routes ,Route ,Navigate} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/register';

import RegisterConfirm from './components/registerConfirm';
import Message from './components/message';
import ForgotPassword from './components/forgotpassword';
import ForgotConfirm from './components/forgotconfirm';
function App() {

  const myStorage = window.localStorage
  let user = myStorage.getItem('user')
  return (
   <>
   
   <Routes>
    <Route path='/' element={user ?<Home/> : <Login/>}/>
    <Route path='/login' element={user ? <Navigate to = "/"/> : <Login/>}/>
    <Route path='/register' element={user ? <Navigate to = "/"/> :<Register/>}/>
    <Route path='/register-confirm/:token' element={user ? <Navigate to = "/"/> :<RegisterConfirm/>}/>
    <Route path='/forgot-password' element={user ? <Navigate to = "/"/> : <ForgotPassword/>}/>
    <Route path='/forgot-confirm/:token' element={user ? <Navigate to = "/"/> : <ForgotConfirm/>}/>    
    <Route path='/chat' element={user ? <Message/> :<Register/>}/>
    <Route path='/profile/:username' element={user ?<Profile/> : <Login/>}/>
   </Routes>
   
   </>
  );
}

export default App;
