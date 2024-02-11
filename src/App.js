import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Nav from './components/Nav';
import PuppyNote from './pages/PuppyNote';
import Gallery from './pages/Gallery';
import Board from './pages/Board';
import Follow from './pages/Follow';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPuppy from './pages/RegisterPuppy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>} />
            <Route path='/puppyNote' element={<PuppyNote/>}></Route>
            <Route path='/gallery' element={<Gallery/>}></Route>
            <Route path='/board' element={<Board/>}></Route>
            <Route path='/follow' element={<Follow/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
						<Route path='/register' element={<Register/>}></Route>
            <Route path='/registerPuppy' element={<RegisterPuppy/>}></Route>
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
  );
}

export default App;
