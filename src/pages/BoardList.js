import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CommonTable from '../components/table/CommonTable.js';
import CommonTableColumn from '../components/table/CommonTableColumn.js';
import CommonTableRow from '../components/table/CommonTableRow.js';
import '../css/Board.css';
import axios from "axios";

let BoardList = () => {
    let [dataList, setDataList] = useState([]);
    let navigate = useNavigate();
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // 페이지 당 게시글 수 설정

    useEffect(() => {
        // 게시글 목록을 불러오는 API
        axios.get('http://localhost:8082/api/v1/auth/n/board')
        .then((res) => {
            console.log("게시글 전체 목록 조회 성공!")
            // 최신글이 가장 위로 오도록 역순으로 정렬
            const sortedData = res.data.sort((a, b) => b.id - a.id);
            setDataList(sortedData);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }, []);

    let createBoard = () => {
        navigate('/createBoard');
    };

    // 현재 페이지에 해당하는 게시글 목록을 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호를 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);    
   
    return(
        <>
        <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>개시판🐶</strong></h3>

        <CommonTable headersName={['글번호', '제목', '등록일', '작성자', '👀조회수', '🖤좋아요']}>
            {
                dataList ? dataList.map((board, index) => {
                    return (
                        <CommonTableRow key={index}>
                            <CommonTableColumn>{dataList.length - (indexOfFirstPost + index)}</CommonTableColumn>
                            <CommonTableColumn>
                                <Link to={`/boardView/${board.id}`} className="board-title">{board.title}</Link>
                            </CommonTableColumn>
                            <CommonTableColumn>{board.board_date}</CommonTableColumn>
                            <CommonTableColumn>{board.user_Id}</CommonTableColumn>
                            <CommonTableColumn>{board.views}</CommonTableColumn>
                            <CommonTableColumn>{board.user_like}</CommonTableColumn>
                        </CommonTableRow>
                    )
                }) : ''    // 삼항 연산자를 사용해 boardList가 존재하는 경우에만 데이터를 매핑하여 테이블 행 생성
                            // 그렇지 않은 경우에는 빈 문자열('') 반환
            }
        </CommonTable>

        <div className="pagination">
            {pageNumbers.map(number => (
                <button key={number} onClick={() => paginate(number)} className="page-link">
                    {number}
                </button>
            ))}
        </div>
        
        <div className="button-container">
            <div className="button-wrapper">
                <button className="creat-board-btn" onClick={createBoard}>📝글쓰기</button>
            </div>
        </div>
        </>
        
    );
}

export default BoardList;