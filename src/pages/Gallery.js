import React, { useEffect, useState } from "react";
import GalleryList from "./GalleryList";
import Nav2 from "../components/Nav2";
import '../css/Gallery.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import AxiosInstance from "../api/AxiosInstance";

let Gallery = (props) => {

    let [cookies, setCookie, removeCookie] = useCookies(['accessToken']);


 //   기본
    return (
        <>
            <div>
                <Nav2/>
            </div>
            <GalleryList />
        </>
    );


    // // 토큰이 존재하는지 확인하고 필요한 경우에만 GalleryList 컴포넌트를 렌더링
    // let [loggedIn, setLoggedIn] = useState(false);
    // let navigate = useNavigate();


    // useEffect(() => {
    //     // 토큰이 존재하는지 확인
    //     if (cookies.accessToken) {
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false);
    //         // 토큰이 없는 경우 바로 로그인 페이지로 이동
    //         window.alert("로그인이 필요합니다.");
    //         navigate("/login");
    //     }
    // }, [cookies.accessToken]);

    //         return (
    //             <>
    //                 <div>
    //                     <Nav2/>
    //                 </div>
    //                 {/* <h2 align="center">게시판</h2> */}
    //                 {loggedIn && <GalleryList />}
    //             </>
    //         );
            
        
    }

export default Gallery;