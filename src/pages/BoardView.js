import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../css/Board.css'
import axios from "axios";
import Nav2 from "../components/Nav2.js";

let BoardView = () => {
    let { id } = useParams();  // URL 파라미터에서 게시글 ID를 가져옴
    let [board, setBoard] = useState(null);
    let [isAuthor, setIsAuthor] = useState(false);  // 작성자 여부 상태
    let [cookies] = useCookies(['accessToken']);
    let navigate = useNavigate();

    // 특정 게시글의 상세 정보를 불러오는 API 호출
    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/auth/n/board?id=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + cookies.accessToken
            }
        })
        .then((res) => {
            // console.log("게시글 상세 조회 성공!");
            // console.log(res.data);
            // const selectedBoard = res.data.find(item => item.id == id); // ID에 해당하는 글 찾기
            // console.log(selectedBoard);
            // setBoard(selectedBoard);

            // //TODO: isAuthor = false 이슈 해결
            // console.log(res.data.isAuthor);
            // setIsAuthor(res.data.isAuthor);
            console.log("게시글 상세 조회 성공!");
            console.log(res.data);
            const selectedBoard = res.data.boardDetail; // API 응답 구조에 따라 수정
            console.log(selectedBoard);
            setBoard(selectedBoard);
            setIsAuthor(res.data.isAuthor); // isAuthor 값 설정


        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }, [id, cookies.accessToken]);

    // 이전 페이지로 돌아가기
    let goBack = () => {
        navigate(-1);
    };    

    // 게시글 수정 페이지로 이동
    let edit = () => {
        // navigate(`/edit/${id}`); 
        navigate(`/edit?id=${id}`)
    };

    // 게시글 삭제
    let del = () => {
        axios.delete(`http://localhost:8082/api/v1/auth/n/boardDetail?id=${id}`)
            .then(() => {
                console.log("게시글 삭제 성공!");
                alert("게시글을 삭제하였습니다 🗑️")
                navigate("/board");   // 삭제 후 게시글 목록으로 이동
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
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
                                <label>{board.user_id}</label>
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
                                    {board.content}
                                </div>
                            </div>

                            {/* 작성자인 경우에만 수정 및 삭제 버튼 표시 */}
                            {isAuthor && (
                                <div className="button-container">
                                    <button className="board-view-edit-btn" onClick={edit}>수정</button>
                                    <button className="board-view-delete-btn" onClick={del}>삭제</button>
                                </div>
                            )}
                        </>
                    ) : '해당 게시글을 찾을 수 없습니다❌'
                }
            <div className="button-container">
                <div className="button-wrapper"></div>
                    <button className="board-view-go-list-btn" onClick={goBack}>목록으로 돌아가기</button>
                </div>
            </div>
        </>
    );
}

export default BoardView;