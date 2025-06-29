import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './components/SignIn';
import Layout from './templates/Layout';
import Participants from './components/Participants';
import Triquizzard from './Events/Triquizzard';
import FIFA from './Events/FIFA';
import Dashboard from './components/Dashboard';
import Groupmusic from './Events/Groupmusic';
import Improv from './Events/Improv';
import Cubing from './Events/Cubing';
import DigitalPosterDesign from './Events/DigitalPosterDesign';
import TamilLits from './Events/TamilLits';
import TitleEvent from './Events/TitleEvent';
import ClassicalDance from './Events/ClassicalDance';
import EnglishLits from './Events/EnglishLits';
import TurfCricket from './Events/TurfCricket';
import TurfFootball from './Events/TurfFootball';
import WesternDance from './Events/WesternDance';
import GroupDrama from './Events/GroupDrama';
import GroupIntrument from './Events/GroupInstrument';
import Art from './Events/Art';
import Coding from './Events/Coding';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to='/signIn' replace/>}/>
    <Route path='/signIn' element={<SignIn/>} />
    <Route element={<Layout/>}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/classicaldance' element={<ClassicalDance/>}/>
      <Route path='/triquizzard' element={<Triquizzard/>}/>
      <Route path='/participants' element={<Participants/>}/>
      <Route path='/fifa' element={<FIFA/>}/>
      <Route path='/groupmusic' element={<Groupmusic/>}/>
      <Route path='/improv' element={<Improv/>}/>
      <Route path='/cube' element={<Cubing/>}/>
      <Route path='/poster' element={<DigitalPosterDesign/>}/>
      <Route path='/tamillits' element={<TamilLits/>}/>
      <Route path='/title' element={<TitleEvent/>}/>
      <Route path='/elits' element={<EnglishLits/>}/>
      <Route path='/cricket' element={<TurfCricket/>}/>
      <Route path='/football' element={<TurfFootball/>}/>
      <Route path='/westerndance' element={<WesternDance/>}/>
      <Route path='/groupdrama' element={<GroupDrama/>}/>
      <Route path='/groupinst' element={<GroupIntrument/>}/>
      <Route path='/art' element={<Art/>}/>
      <Route path='/code' element={<Coding/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
