import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './components/SignIn';
import Layout from './templates/Layout';
import Participants from './components/Participants';
import Triquizzard from './Events/Triquizzard';
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
import StaffContact from './components/StaffContact';
import Homepage from './general/Homepage';
import Events from './general/Events';
import Contact from './general/Contact';
import Navbar from './general/Navbar';
import Chess from './Events/Chess';
import Poster2 from './Events/Poster 2';
import Leaderboard from './general/Leaderboard';
import OrganiserDashboard from './components/organiserDashboard';
import Heritage from './Events/Heritage';
import Auction from './Events/Auction';
import EnglishLits1 from './Events/EnglishLits1';
import GroupDance from './Events/GroupDance';
import EnterResults from './components/EnterResults';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to='/homepage' replace/>}/>
    <Route path='/signIn' element={<SignIn/>} />
    <Route element={<Navbar/>}>
  <Route path='/homepage' element={<Homepage/>}/>
  <Route path='/events' element={<Events/>}/>
  <Route path='/POC' element={<Contact/>}/>
  <Route path='/leaderboard' element={<Leaderboard/>}/>
</Route>
    <Route element={<Layout/>}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/organiserDashboard' element={<OrganiserDashboard/>} />
      <Route path='/enterResults' element={<EnterResults/>} />
      <Route path='/teacherInfo' element={<StaffContact/>}/>
      <Route path='/classicaldance' element={<ClassicalDance/>}/>
      <Route path='/triquizzard' element={<Triquizzard/>}/>
      <Route path='/participants' element={<Participants/>}/>
      <Route path='/Chess' element={<Chess/>}/>
      <Route path='/groupmusic' element={<Groupmusic/>}/>
      <Route path='/improv' element={<Improv/>}/>
      <Route path='/cubing' element={<Cubing/>}/>
      <Route path='/poster1' element={<DigitalPosterDesign/>}/>
      <Route path='/poster2' element={<Poster2/>}/>
      <Route path='/tamillits1' element={<TamilLits/>}/>
      <Route path='/tamillits2' element={<TamilLits/>}/>  
      <Route path='/titleevent' element={<TitleEvent/>}/>
      <Route path='/elits2' element={<EnglishLits/>}/>
      <Route path='/elits1' element={<EnglishLits1/>}/>
      <Route path='/cricket' element={<TurfCricket/>}/>
      <Route path='/football' element={<TurfFootball/>}/>
      <Route path='/westerndance' element={<WesternDance/>}/>
      <Route path='/groupdrama' element={<GroupDrama/>}/>
      <Route path='/groupinst' element={<GroupIntrument/>}/>
      <Route path='/art1' element={<Art/>}/>
      <Route path='/art2' element={<Art/>}/>
      <Route path='/code' element={<Coding/>}/>
      <Route path='/screenplay' element={<Improv/>}/>
      <Route path='/heritage' element={<Heritage/>}/>
      <Route path='/shortfilm' element={<GroupDrama/>}/>
      <Route path='/auction' element={<Auction/>}/>
      <Route path='/groupdance' element={<GroupDance/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
