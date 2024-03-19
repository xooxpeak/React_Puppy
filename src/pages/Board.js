import React from "react";
import BoardList from "./BoardList";
import Nav from "../components/Nav";
import { NavLink } from 'react-router-dom';

const Board = props => {
        return (
            <>
                <div>
                    <Nav/>
                </div>
                {/* <h2 align="center">게시판</h2> */}
                <BoardList/>
            </>
        )
    }

export default Board;