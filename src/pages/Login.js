import React, { useState } from "react";
import '../css/Login.css';
import Nav2 from "../components/Nav2";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

let Login = () => {

        let [cookies, setCookies] = useCookies(['accessToken']);

        // 아이디와 비밀번호
        let [userId, setUserId] = useState("");
        let [password, setPassword] = useState("");

        const kakaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;

        let navigate = useNavigate();   // useNavigate 훅 사용

        let onUserIdHandler = (e) => {
            setUserId(e.target.value)
            console.log("userId: ", e.target.value);
        }

        let onPasswordHandler = (e) => {
            setPassword(e.target.value)
            console.log("password: ", e.target.value);
        }

        // 로그인 함수
        let loginHandler = () => {

            // 아이디 또는 비밀번호가 비어 있는 경우
            if (!userId || !password) {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            // 로그인 요청 보내기
            axios({
                url: 'http://localhost:8082/api/v1/auth/n/login',
                method: 'POST',
                data: {
                    userId: userId,
                    password: password
                }
            })
            .then((res) => {
                // 로그인 성공
                console.log(res.data)
                console.log(res.status)
                if (res.status === 200) {
                    // 쿠키에 사용자 정보 저장
                   // setCookies('user', { userId, password });  

                    // 서버로부터 받은 액세스 토큰을 쿠키에 저장
                    setCookies('accessToken', res.data.accessToken);

                    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                   
                   // 이 쿠키는 서버에 요청을 보낼 때마다 브라우저가 해당 쿠키를 함께 보냄
                   // document.cookie = `accessToken=${res.data.accessToken}; Path=/;`;

                    alert("로그인 성공!");
                    navigate("/");  // 메인페이지로 이동
                    
                } else {
                    console.log(res.status)
                // 로그인 실패
                    alert("아이디 또는 비밀번호가 잘못되었습니다.");
                    
                }
            })
            .catch((error) => {
                // 서버 오류 또는 네트워크 오류
                alert("로그인에 실패하였습니다.");
                console.error("Error:", error);
            });
        }


        return (
            <>
                <div>
                    <Nav2/>
                </div>
                
                <div className="loginForm">
                    <div>
                        <h3 id='login_title'>로그인</h3>
                    </div>
                    <div>
                        <div className="input">
                            <input type="text" className="userId" id="userId" placeholder="아이디" value={userId} onChange={onUserIdHandler} autoFocus></input>
                            <input type="password" className="password" id="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}></input>
                            <button onClick={loginHandler}>Login</button>
                            <a href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoAPI}&redirect_uri=http://localhost:3000/login/oauth2/code/kakao`} className="kakao-login-link"> 카카오 로그인</a>
                        </div>
                        <div className="link">
                            <NavLink to="/findId">아이디 찾기</NavLink>
                            <span>&nbsp;|&nbsp;</span>
                            <NavLink to="/findPw">비밀번호 찾기</NavLink>
                            <span>&nbsp;|&nbsp;</span>
                            <NavLink to="/register">회원가입</NavLink>
                        </div>
                    </div>
                </div>
            </>
        );
    }

export default Login;