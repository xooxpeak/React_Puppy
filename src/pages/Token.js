import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies  } from 'react-cookie';

let Token = () => {
    let [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

    // accessToken과 refreshToken의 상태를 관리하기 위한 useState 훅 사용. 초기값은 쿠키에서 가져옴.
    let [accessToken, setAccessToken] = useState(cookies.accessToken);
    let [refreshToken, setRefreshToken] = useState(cookies.refreshToken);

    // 쿠키의 토큰들을 저장 & 상태를 업데이트 
    useEffect(() => {
        setAccessToken(cookies.accessToken);
        setRefreshToken(cookies.refreshToken);
    }, [cookies]);

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


    return(
        <>
        </>
    )
}

export default Token;