import React, { useState, useEffect } from "react";
import '../css/Login.css';
import Nav2 from "../components/Nav2";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const generateState = () => {
    return Math.random().toString(36).substring(2, 15);
};

let Login = () => {

        // let [cookies, setCookies, removeCookie] = useCookies(['accessToken']);
        let [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

        // accessToken과 refreshToken의 상태를 관리하기 위한 useState 훅 사용. 초기값은 쿠키에서 가져옴.
        let [accessToken, setAccessToken] = useState(cookies.accessToken);
        let [refreshToken, setRefreshToken] = useState(cookies.refreshToken);

        // 아이디와 비밀번호
        let [userId, setUserId] = useState("");
        let [password, setPassword] = useState("");

        const kakaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;
        
        // .env 사용하면 왜 안될까?
        //const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;

        // .env 사용하지 않았더니 됨
        const naverClientId = "OybP54NI6clQWNbhDnlm";

        let navigate = useNavigate();   // useNavigate 훅 사용


        // 쿠키의 토큰들을 저장 & 상태를 업데이트 
        useEffect(() => {
            setAccessToken(cookies.accessToken);
            setRefreshToken(cookies.refreshToken);
        }, [cookies]);

        let onUserIdHandler = (e) => {
            setUserId(e.target.value)
            console.log("userId: ", e.target.value);
        }

        let onPasswordHandler = (e) => {
            setPassword(e.target.value)
            console.log("password: ", e.target.value);
        }


    // accessToken을 갱신하기 위한 함수
    let refreshAccessToken = async () => {
        try {
            // 서버에 refreshToken을 보내고 새로운 accessToken을 받음
            let response = await axios.post(
                `http://localhost:8082/api/v1/auth/n/refreshToken`,
                { refreshToken },  // 요청 본문에 refreshToken 포함
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // 새로운 accessToken을 쿠키에 저장하고 상태도 업데이트
            setCookie('accessToken', response.data.accessToken, { path: '/' });
            setAccessToken(response.data.accessToken);
        } catch (error) {
            console.log('error: ', error);
        }
    };




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
                    // 서버로부터 받은 액세스 토큰을 쿠키에 저장
                    setCookie('accessToken', res.data.accessToken, { path: '/' });
                    setCookie('refreshToken', res.data.refreshToken, { path: '/' });
                    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                    alert("로그인 성공!");
                    navigate("/");  // 메인페이지로 이동
                    
                }  else if (res.status === 401) {
                    // Access Token이 만료된 경우, Access Token 재발급 시도
                    // retryLogin();
                    refreshAccessToken();
                } else {
                    // 로그인 실패
                    console.log(res.status)
                    alert("아이디 또는 비밀번호가 잘못되었습니다.");
                    
                }
            })
            .catch((error) => {
                // 서버 오류 또는 네트워크 오류
                alert("로그인에 실패하였습니다.");
                console.error("Error:", error);
            });
        }


        // 로그아웃
        let logout = () => {
            removeCookie('accessToken', { path: '/' });
            removeCookie('refreshToken', { path: '/' });
            axios.defaults.headers.common['Authorization'] = null;
            navigate("/login");
        }

        const state = generateState();
        localStorage.setItem("naver_state", state);

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
                            <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=http://localhost:8082/api/v1/auth/n/naverLogin&state=${encodeURIComponent(state)}`} className="naver-login-link"> 네이버 로그인</a>
                            {/* <button onClick={naverLoginHandler} className="naver-login-link">네이버 로그인</button> */}
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