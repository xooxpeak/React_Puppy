import React from "react";
import GalleryList from "./GalleryList";
import Nav2 from "../components/Nav2";
import '../css/Gallery.css';
import { NavLink } from 'react-router-dom';

let Gallery = props => {
        return (
            <>
                <div>
                    <Nav2/>
                </div>
                {/* <h2 align="center">게시판</h2> */}
                <GalleryList/>
            </>
        )
    }

export default Gallery;