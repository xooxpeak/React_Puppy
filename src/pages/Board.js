import React from "react";
import BoardList from "./BoardList";
import Nav2 from "../components/Nav2";
import '../css/Board.css';
import { NavLink } from 'react-router-dom';

const Board = props => {
        return (
            <>
                <div>
                    <Nav2/>
                </div>
                {/* <h2 align="center">게시판</h2> */}
                <BoardList/>
            </>
        )
    }

export default Board;