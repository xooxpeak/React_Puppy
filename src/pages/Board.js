import React from "react";
import BoardList from "./BoardList";
import Nav2 from "../components/Nav2";
import '../css/Board.css';
import { NavLink } from 'react-router-dom';

const Board = (props) => {
        return (
            <>
                <div>
                    <Nav2/>
                </div>
                <BoardList/>
            </>
        )
    }

export default Board;