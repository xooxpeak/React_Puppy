import React, { useEffect, useState } from "react";
import GalleryList from "./GalleryList";
import Nav2 from "../components/Nav2";
import '../css/Gallery.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let Gallery = () => {

    let [cookies] = useCookies(['accessToken']);
    const axios = useAxios(); // Axios 인스턴스 사용
    const navigate = useNavigate();

    // useEffect(() => {
    //     // 토큰으로 로그인 검증
    //     if (!cookies.accessToken) {
    //         alert('로그인 해주세요!');
    //         navigate('/login');
    //         return;
    //     }
    // }, [cookies.accessToken, navigate]);

 //   기본
    return (
        <>
            <div>
                <Nav2/>
            </div>
            <GalleryList />
        </>
    );
                
    }

export default Gallery;