import React from "react";
import '../css/Nav.css'
import { NavLink } from "react-router-dom";


let Nav = () => {

    return (
        <nav>
            <div>
                
                <span>
                    <NavLink to="/">
                         Main(로고)
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/puppyNote">
                        알림장
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/gallery">
                        사진첩
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/board">
                        게시판
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/follow">
                        친구목록
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/login">
                        <button id="navLoginBut">
                            로그인
                        </button>
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/register">
                        <button id="registerBut">
                            회원가입
                        </button>
                    </NavLink>
                </span>
                
                {/* 추후 수정 : 로그인 / 로그아웃 케이스 나누어서 버튼 보여주기
                로그인 => 마이페이지, 로그아웃
                로그아웃 => 로그인, 회원가입 */}

                {/* <span>
                    <NavLink to="/mypage">
                        <button>
                            마이페이지
                        </button>
                    </NavLink>
                </span>
                <span className="nav-link">
                    <NavLink to="/logout">
                        <button>
                            로그아웃
                        </button>
                    </NavLink>
                </span> */}
            </div>
        </nav>
    )
}

export default Nav;