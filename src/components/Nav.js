import React from "react";
import '../css/Nav.css'
import { NavLink } from "react-router-dom";


let Nav = () => {

    return (
        <nav>
            <div>
            <span className="main">
                <NavLink to="/">
                    Main(나중에 로고로 변경)
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
                    로그인
                </NavLink>
            </span>
            <span>
                <NavLink to="/register">
                    회원가입
                </NavLink>
            </span>
            </div>
        </nav>
    )
}

export default Nav;