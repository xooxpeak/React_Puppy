import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreatBoard.css';
import Nav2 from "../components/Nav2";

let CreatBoard = () => {
  // 게시글 작성에 필요한 상태 변수들
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  // 게시글 작성 핸들러
  let handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지

    // try {
    //   // 서버에 게시글 작성 요청 보내기
    //   let response = await axios.post('http://example.com/api/posts', {
    //     title,
    //     content
    //   });

    axios({
        url: 'http://localhost:8082/api/v1/auth/y//createBoard',
        method: 'POST',
        data: {
            title: setTitle,
            content: setContent
        }
    })
    .then((res) => {
      // 성공
      alert('게시글이 성공적으로 작성되었습니다!');

      // 입력 필드 초기화
      setTitle('');
      setContent('');

    }) 
    .catch ((error) => {
        // 오류 발생 시 에러 메시지 출력
        console.error('게시글 작성 오류:', error);
    })
  };

  return (
    <div>
        <div>
            <Nav2/>
        </div>
        <div className="createBoardForm">
            <div>
                <h1 id='createBoard_title'>게시글 작성</h1>
            </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
    </div>
  );
};

export default CreatBoard;
