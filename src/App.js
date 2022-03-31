import Login from "./components/Login";
import Register from "./components/Register";
import Explore  from "./components/Explore";
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from "./DataContext";
import AccSettings from "./components/AccSettings";
import ChangeName from "./components/change credentials/ChangeName";
import ChangeUsername from "./components/change credentials/ChangeUsername";
import ChangePassword from "./components/change credentials/ChangePassword";
import Chat from "./components/Chat";
import Notifs from "./components/Notifs";
import PostPage from "./components/PostPage";

function App() {


  return (
    <div>
      <DataProvider>
        <Routes>
            <Route exact path='/' element={<Login />}/>
            <Route exact path='/register' element={<Register />}/>
            <Route exact path='/explore' element={<Explore/>}/>
            <Route path='/explore/:username/:id' element={<PostPage/>}/>
            <Route exact path='/account' element={<AccSettings/>}/>
            <Route exact path='/account/change-name' element={<ChangeName/>}/>
            <Route exact path='/account/change-username' element={<ChangeUsername/>}/>
            <Route exact path='/account/change-password' element={<ChangePassword/>}/>
            <Route exact path='/chat' element={<Chat/>}/>
            <Route exact path='/notifications' element={<Notifs/>}/>
        </Routes>
      </DataProvider>
    </div>
    
  );
}

export default App;
