import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CommonTable from '../components/table/CommonTable.js';
import CommonTableColumn from '../components/table/CommonTableColumn.js';
import CommonTableRow from '../components/table/CommonTableRow.js';
import { boardList } from '../../src/Data.js';
import Button from 'react-bootstrap/Button';
import '../css/Board.css';

const BoardList = props => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setDataList(boardList);
    }, [ ])

    return(
        <>
        <CommonTable headersName={['글번호', '제목', '등록일', '작성자', '조회수', '좋아요 수']}>
            {
                dataList ? dataList.map((item, index) => {
                    return (
                        <CommonTableRow key={index}>
                            <CommonTableColumn>{item.no}</CommonTableColumn>
                            <CommonTableColumn>
                                <Link to={`/boardView/${item.no}`}>{item.title}</Link>
                            </CommonTableColumn>
                            <CommonTableColumn>{item.boardDate}</CommonTableColumn>
                            <CommonTableColumn>{item.userId}</CommonTableColumn>
                            <CommonTableColumn>{item.views}</CommonTableColumn>
                            <CommonTableColumn>{item.userLike}</CommonTableColumn>
                        </CommonTableRow>
                    )
                }) : ''    // 삼항 연산자를 사용해 dataList가 존재하는 경우에만 데이터를 매핑하여 테이블 행 생성
                            // 그렇지 않은 경우에는 빈 문자열('') 반환
            }
        </CommonTable>
        <div className="button-container">
            <button className="creat-board-btn">게시글 작성</button>
        </div>
        </>
        
    );
}

export default BoardList;