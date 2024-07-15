import React, { useState, useEffect } from "react";
import '../css/Login.css';
import Nav2 from "../components/Nav2";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAxios } from "../AxiosContext";

const generateState = () => {
    return Math.random().toString(36).substring(2, 15);
};

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const kakaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const naverClientId = "OybP54NI6clQWNbhDnlm";

    const navigate = useNavigate();
    const axios = useAxios();

    useEffect(() => {
        console.log("Updated cookies:", cookies);
    }, [cookies]);

    const onUserIdHandler = (e) => {
        setUserId(e.target.value);
        console.log("userId: ", e.target.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
        console.log("password: ", e.target.value);
    };

    const loginHandler = async () => {
        if (!userId || !password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:8082/api/v1/auth/n/login', {
                userId,
                password
            });

            if (res.status === 200) {
                console.log("Login response:", res.data);

                setCookie('accessToken', res.data.accessToken, { path: '/' });

                // 확인 로그
                console.log("Received accessToken:", res.data.accessToken);

                // 바로 쿠키가 반영되지 않는 경우를 위해 확인 로그 추가
                // setTimeout(() => {
                //     console.log("Updated cookies after setTimeout:", cookies);
                // }, 1000);

                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                alert("로그인 성공!");
                navigate("/"); 
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("아이디 또는 비밀번호가 잘못되었습니다.");
            } else {
                console.error("Login Error:", error);
                alert("로그인 중 오류가 발생했습니다.");
            }
        }
    };

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
                        <input type="text" className="userId" id="userId" placeholder="아이디" value={userId} onChange={onUserIdHandler} autoFocus />
                        <input type="password" className="password" id="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} />
                        <button onClick={loginHandler} className="loginBut">Login</button>
                        <a href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoAPI}&redirect_uri=http://localhost:3000/login/oauth2/code/kakao`} className="kakao-login-link"> 카카오 로그인</a>
                        <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=http://localhost:3000/login/oauth2/code/naver&state=${generateState()}`} className="naver-login-link"> 네이버 로그인</a>
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
};

export default Login;
