import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

let KakaoLogin = () => {
    let [cookies, setCookies] = useCookies(['accessToken']);

    // 현재 URL에 대한 정보를 가져오는 훅
    let location = useLocation();

    // location.search를 통해 현재 URL의 쿼리 파라미터를 가져와 URLSearchParams 객체를 생성하고
    // 그 중 code 파라미터를 추출
    const params = new URLSearchParams(location.search);
    let code = params.get('code');

    // const code = new URL(window.location.href).serchParams.get("code");


    // useEffect Hook
    useEffect(() => {
        console.log(code);
    })


    // login 함수
    // 위에서 얻은 인가코드를 백엔드의 카카로 로그인주소로 보냄
    let login = () => {
        axios({
            url: 'http://localhost:8082/api/v1/auth/n/kakaoLogin',
            method: 'GET',
            data: {
                code: code
            },
            headers: {
                'Authorization': 'Bearer ' + cookies.accessToken
             }
        })
            .then((res) => {
                console.log(res);
                // 계속 쓸 정보들(이름) 등은 localStorage에 저장해두기
                // localStorage.setItem("name", res.data.);
                
                // 로그인이 성공하면 이동
                // Navigate("/"); 
            })
            .catch((error) => {
                console.log("Error: ", error);
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