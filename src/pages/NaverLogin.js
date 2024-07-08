import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

let NaverLogin = () => {
    let [cookies, setCookies] = useCookies(['accessToken']);
    // 현재 URL에 대한 정보를 가져오는 훅
    let location = useLocation();
    let navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');


    useEffect(() => {
        if (code && state) {
            console.log("code:", code);
            login(code, state);
        } else {
            navigate('/login');
        }
    }, [code, state]);


    // login 함수
    // 위에서 얻은 인가코드를 서버의 네이버 로그인주소로 보냄
    let login = (code, state) => {
        axios.post(`http://localhost:8082/api/v1/auth/n/naverLogin`, {
            code: code,
            state: state
        })
        .then((res) => {
            console.log("res:", res);
            setCookies('accessToken', res.data.accessToken, {
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 // 쿠키 만료 시간 설정 (7일)
            });
            navigate('/');
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("로그인에 실패하였습니다.");
            navigate('/login');
        });
    };


    return (
        <>
            <p>로그인 중입니다.</p>
            <p>잠시만 기다려주세요.</p>
        </>
        );
};

export default NaverLogin;