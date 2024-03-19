import React, { useEffect, useState } from "react";
import { getPostByNo } from '../../src/Data.js';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Board.css'

const BoardView = ({ history }) => {
    const [data, setData] = useState({});

    const {no} = useParams();

    useEffect(() => {
        setData(getPostByNo(no));
    }, [ ]);

let navigate = useNavigate();
let goBack = () => {
    navigate(-1);
};    

    return(
        <>
            <h2 align="center">게시글 상세정보</h2>

            <div className="board-view-wrapper">
                {
                    data ? (
                        <>
                            <div className="board-view-row">
                                <label>게시글 번호</label>
                                <label>{data.no}</label>
                            </div>
                            <div className="board-view-row">
                                <label>제목</label>
                                <label>{data.title}</label>
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
                                <label>조회수</label>
                                <label>{data.views}</label>
                            </div>
                            <div className="board-view-row">
                                <label>좋아요</label>
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
                <button className="board-view-go-list-btn" onClick={goBack}>목록으로 돌아가기</button>
            </div>
        </>
    )
}

export default BoardView;