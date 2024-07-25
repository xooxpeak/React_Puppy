import React, { useEffect, useState } from "react";
import GalleryList from "./GalleryList";
import Nav2 from "../components/Nav2";
import '../css/Gallery.css';
import { useCookies } from "react-cookie";
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let Gallery = () => {

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