import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../css/Board.css'
import Nav2 from "../components/Nav2.js";
import Comment from './Comment'; // Comment 컴포넌트 임포트
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let BoardView = () => {
    let { id } = useParams();  // URL 파라미터에서 게시글 ID를 가져옴
    let [board, setBoard] = useState(null);
    let [isAuthor, setIsAuthor] = useState(false);  // 작성자 여부 상태
    let [isLiked, setIsLiked] = useState(false);  // 좋아요 여부 상태
    let [cookies] = useCookies(['accessToken', 'user_id']);
    let navigate = useNavigate();
    const axios = useAxios(); // Axios 인스턴스 사용

    // 특정 게시글의 상세 정보를 불러오는 API 호출
    useEffect(() => {
        // 로그인 되지 않았을 경우
        if (!cookies.accessToken) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login"); // 로그인 페이지로 이동
            return; // 클린업 함수가 필요하지 않으므로 undefined 반환
        }

        // 로그인이 되어 있을 때 게시글 상세 정보를 불러오는 API 호출
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/auth/n/board?id=${id}`);

                const { data } = response;  // axios로부터 받은 응답(response)객체에서 data 속성을 추출하여 data에 할당
                
                console.log(data.board);
                console.log(data.isAuthor);
                console.log("Is liked:", data.isLiked);

                setBoard(data.board);  // 상태 갱신
                setIsAuthor(data.isAuthor);  // 상태 갱신
                setIsLiked(data.isLiked);  // 좋아요 상태 갱신
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();

        // 클린업 함수를 반환
        return () => {
        };
    }, [id, cookies.accessToken, axios]);

    
    // 이전 페이지로 돌아가기
    let goBack = () => {
        navigate(-1);
    };    


    // 게시글 수정 페이지로 이동
    let edit = (id) => {
        console.log(id);
        navigate(`/editBoard/${id}`);
    };


    // 게시글 삭제
    let del = () => {
        axios.delete(`/api/v1/auth/n/deleteBoard?id=${id}`)
            .then(() => {
                console.log("게시글 삭제 성공!");
                alert("게시글을 삭제하였습니다 🗑️")
                navigate("/board");   // 삭제 후 게시글 목록으로 이동
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    };


    // 좋아요
    let like = async () => {
        try {
            let res = await axios.post(`/api/v1/auth/y/userLike/${board.id}`);
                
            let { data } = res;

            if(data.code === "200") {
                setIsLiked(!isLiked);  // 좋아요 상태 반전
                setBoard(prevBoard => ({
                    ...prevBoard,
                    user_like: prevBoard.user_like + (isLiked ? -1 : 1)
                }));
            } else {
                alert(data.message);
                console.log("Like failed. Message:", data.message);
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return(
        <>
        <div>
            <Nav2/>
        </div>
        {/* <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>개시판🐶</strong></h3> */}
        <div className="board-view-title-box">
            <div className="board-view-title">
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
                                <label>{board.user_Id}</label>
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

                            <div className="like-button-container">
                                <button 
                                    className={`like-button ${isLiked ? 'liked' : ''}`} 
                                    onClick={like}
                                >
                                    {isLiked ? '💘' : '🤍'}
                                </button>
                            </div>


                            {isAuthor && (
                            <div className="edit-del-button-container">
                                <button className="board-view-edit-btn" onClick={() => edit(board.id)}>수정</button>
                                <span className="button-gap"></span>
                                <button className="board-view-delete-btn" onClick={del}>삭제</button>
                            </div>
                        )}

                        {/* 댓글 컴포넌트 */}
                        <Comment id={id} cookies={cookies} />

                        <div className="button-container">
                            <button className="board-view-go-list-btn" onClick={goBack}>목록으로 돌아가기</button>
                        </div>
                    </>
                ) : (
                    <div className="board-not-found">해당 게시글을 찾을 수 없습니다❌</div>
                )}
            </div>
        </>
    );
};

export default BoardView;