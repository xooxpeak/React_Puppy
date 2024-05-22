import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Board.css'
import axios from "axios";
import Nav2 from "../components/Nav2.js";

let BoardView = () => {
    let { id } = useParams();  // URL 파라미터에서 게시글 ID를 가져옴
    let [board, setBoard] = useState(null);
    let navigate = useNavigate();

    // 특정 게시글의 상세 정보를 불러오는 API 호출
    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/auth/n/board?id=${id}`)
        .then((res) => {
            console.log("게시글 상세 조회 성공!");
            console.log(res.data);
            setBoard(selectedBoard);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }, [id]);

    // 이전 페이지로 돌아가기
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
                {/* {board.title} */}
                {board ? board.title : '해당 게시글을 찾을 수 없습니다.'}
            </div>
        </div>


            <div className="board-view-wrapper">
                {
                    board ? (
                        <>
                            <div className="board-view-row">
                                <label>게시글 번호</label>
                                <label>{board.id}</label>
                            </div>
                            <div className="board-view-row">
                                <label>작성일</label>
                                <label>{board.board_date}</label>
                            </div>
                            <div className="board-view-row">
                                <label>작성자</label>
                                <label>{board.userId}</label>
                            </div>
                            <div className="board-view-row">
                                <label>👀조회수</label>
                                <label>{board.views}</label>
                            </div>
                            <div className="board-view-row">
                                <label>🖤좋아요</label>
                                <label>{board.user_like}</label>
                            </div>
                            <div className="board-view-row">
                                <label>내용</label>
                                <div>
                                    {
                                        board.content
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