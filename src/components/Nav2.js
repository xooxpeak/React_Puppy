import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let Nav2 = () => {
  
  let navigate = useNavigate(); 
  const axios = useAxios(); // Axios 인스턴스 사용
  

  let [cookies, setCookies, removeCookies] = useCookies(['accessToken']);  // 쿠키 관리
  let [isLogin, setIsLogin] = useState(false); // 로그인 상태 관리
  
  useEffect(() => {
    // 쿠키에서 accessToken을 확인하여 로그인 상태를 설정
    if (cookies.accessToken) {
        setIsLogin(true); // 로그인 상태로 설정
    } else {
        setIsLogin(false); // 로그아웃 상태로 설정
    }
  }, [cookies.accessToken]);


  // 로그아웃 함수
  const handleLogout = async () => {
    try {
        // 로그아웃 요청
        await axios.post('/api/v1/auth/n/logout');

        console.log("로그아웃 성공!");
        removeCookies('accessToken', { path: '/' });
        setIsLogin(false);  // 로그인 상태 업데이트
        navigate("/login");

    } catch (error) {
        console.log("토큰 만료 또는 로그아웃 실패", error);
    }
};




  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">🐶댕린이집</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/noteList">알림장</Nav.Link>
            <Nav.Link href="/gallery">사진첩</Nav.Link>
            <Nav.Link href="/board">게시판</Nav.Link>
            <NavDropdown title="멍멍친구" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">친구목록</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">대화하기</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="댕린이집" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/createStore">새로운 댕린이집 신청</NavDropdown.Item>
              <NavDropdown.Item href="/storeList">댕린이집 목록</NavDropdown.Item>
              <NavDropdown.Item href="/registerPuppy">우리 아이 등록</NavDropdown.Item>
              <NavDropdown.Item href="/puppy">우리 아이 정보</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            {/* 로그인 상태에 따라 다른 링크를 표시 */}
            {isLogin ? (
              <>
              <NavDropdown title="마이페이지" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile">프로필</NavDropdown.Item>
                <NavDropdown.Item href="/puppy">강아지 정보</NavDropdown.Item>
                <NavDropdown.Item href="/settings">설정</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/register">회원가입</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav2;