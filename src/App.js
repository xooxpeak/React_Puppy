import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import axios from "axios";
import Main from './Main';
// import Nav from './components/Nav';
import PuppyNote from './pages/PuppyNote';
import CreateGallery from './pages/CreateGallery';
import Gallery from './pages/Gallery';
import GalleryView from './pages/GalleryView';
import Board from './pages/Board';
import BoardView from './pages/BoardView';
import CreatBoard from './pages/CreateBoard';
import Follow from './pages/Follow';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPuppy from './pages/RegisterPuppy';
import CreateStore from './pages/CreateStore';
import StoreList from './pages/StoreList';

axios.defaults.withCredentials = true;

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>} />
              <Route path='/puppyNote' element={<PuppyNote/>}></Route>
              <Route path='/gallery' element={<Gallery/>}></Route>
              <Route exact path='/galleryView/:id' element={<GalleryView/>}></Route>
              <Route path='/createGallery' element={<CreateGallery/>}></Route>
              <Route path='/board' element={<Board/>}></Route>
              <Route exact path='/boardView/:no' element={<BoardView/>}></Route>
              <Route path='/createBoard' element={<CreatBoard/>}></Route>
              <Route path='/follow' element={<Follow/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/registerPuppy' element={<RegisterPuppy/>}></Route>
              <Route path='/createStore' element={<CreateStore/>}></Route>
              <Route path='/storeList' element={<StoreList/>}></Route>
              {/* <Route path='/findId' element={<FindId/>}></Route>
              <Route path='/findPw' element={<FindPw/>}></Route>
              <Route path='/resetPw' element={<ResetPw/>}></Route>
              <Route path='/myPage' element={<MyPage/>}></Route>
              <Route path='/likeList' element={<LikeList/>}></Route>
              <Route path='/writeList' element={<WriteList/>}></Route>
              <Route path='/deleteId' element={<DeleteId/>}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </CookiesProvider>
  );
}

export default App;
