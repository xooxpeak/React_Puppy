import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">🐶댕린이집</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/puppyNote">알림장</Nav.Link>
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
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">로그인</Nav.Link>
            <Nav.Link href="/register">회원가입</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;