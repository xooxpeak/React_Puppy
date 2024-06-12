import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

let KakaoLogin = () => {
    let [cookies, setCookies] = useCookies(['accessToken']);
    // 현재 URL에 대한 정보를 가져오는 훅
    let location = useLocation();
    let navigate = useNavigate();

    // location.search를 통해 현재 URL의 쿼리 파라미터를 가져와 URLSearchParams 객체를 생성하고
    // 그 중 code 파라미터를 추출
    const params = new URLSearchParams(location.search);
    let code = params.get('code');

    // useEffect Hook
    useEffect(() => {
        if (code) {
            console.log("code:", code);
            login();  // 코드가 존재하면 로그인 함수 호출
        } else {
            console.log("code not found");
        }
    }, [code]);


    // login 함수
    // 위에서 얻은 인가코드를 백엔드의 카카로 로그인주소로 보냄
    let login = () => {
        axios({
            url: 'http://localhost:8082/api/v1/auth/n/kakaoLogin',
            method: 'POST',
            data: {
                code: code
            },
        })
            .then((res) => {
                // 인증 토큰을 받아서 처리
                console.log("res:",res);

                setCookies('accessToken', res.data.accessToken, {
                    path: '/',
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 // 쿠키 만료 시간 설정 (7일)
                });

                // 토큰을 localStorage에 저장(?)
                // localStorage.setItem("accessToken: ", res.data.accessToken);

                // 로그인이 성공하면 메인 페이지로 이동
                navigate('/'); 
            })
            .catch((error) => {
                console.log("Error: ", error);
                alert("로그인에 실패하였습니다.")
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

export default KakaoLogin;