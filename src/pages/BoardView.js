import React, { useEffect, useState } from "react";
import { getPostByNo } from '../../src/Data.js';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Board.css'
import Nav2 from "../components/Nav2.js";

let BoardView = ({ history }) => {
    let [data, setData] = useState({});

    let {no} = useParams();

    useEffect(() => {
        setData(getPostByNo(no));
    }, [ ]);

let navigate = useNavigate();
let goBack = () => {
    navigate(-1);
};    

    return(
        <>
        <div>
            <Nav2/>
        </div>
        <div className="board-view-title-box">
            <div className="board-view-title">
                {data.title}
            </div>
        </div>


            <div className="board-view-wrapper">
                {
                    data ? (
                        <>
                            <div className="board-view-row">
                                <label>게시글 번호</label>
                                <label>{data.no}</label>
                            </div>
                            <div className="board-view-row">
                                <label>작성일</label>
                                <label>{data.boardDate}</label>
                            </div>
                            <div className="board-view-row">
                                <label>작성자</label>
                                <label>{data.userId}</label>
                            </div>
                            <div className="board-view-row">
                                <label>👀조회수</label>
                                <label>{data.views}</label>
                            </div>
                            <div className="board-view-row">
                                <label>🖤좋아요</label>
                                <label>{data.userLike}</label>
                            </div>
                            <div className="board-view-row">
                                <label>내용</label>
                                <div>
                                    {
                                        data.content
                                    }
                                </div>
                            </div>
                        </>
                    ) : '해당 게시글을 찾을 수 없습니다❌'
                }
            <div className="button-container">
                <div className="button-wrapper"></div>
                    <button className="board-view-go-list-btn" onClick={goBack}>목록으로 돌아가기</button>
                </div>
            </div>
        </>
    )
}

export default BoardView;