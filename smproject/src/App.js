import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './components/SignIn';
import Layout from './templates/Layout';
import Participants from './components/Participants';
import Triquizzard from './Events/Triquizzard';
import FIFA from './Events/FIFA';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to='/signIn' replace/>}/>
    <Route path='/signIn' element={<SignIn/>} />
    <Route element={<Layout/>}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/triquizzard' element={<Triquizzard/>}/>
      <Route path='/participants' element={<Participants/>}/>
      <Route path='/fifa' element={<FIFA/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
