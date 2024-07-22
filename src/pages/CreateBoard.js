import React, { useState } from 'react';
import '../css/CreatBoard.css';
import Nav2 from "../components/Nav2";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../AxiosContext';   // Axios 인스턴스 가져오기

let CreateBoard = () => {
  let [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const axios = useAxios(); // Axios 인스턴스 사용

  // 게시글 작성에 필요한 상태 변수들
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  // 게시글 작성 핸들러
  let handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지

    try {
      const res = await axios.post('/api/v1/auth/n/createBoard', {
        title: title,
        content: content,
      });

      // 성공
      alert('게시글이 성공적으로 작성되었습니다!');
      console.log('게시글 제목:', title);
      console.log('게시글 내용:', content);
      setTitle(res.data.title);
      setContent(res.data.content);

      // 게시글 작성 후 입력 필드 초기화
      setTitle('');
      setContent('');
      navigate('/board'); // 게시글 목록 페이지로 이동
    } catch (error) {
      // 오류 발생 시 에러 메시지 출력
      console.error('게시글 작성 오류:', error);
    }
  };

  return (
    <>
      <div>
        <Nav2/>
      </div>
      <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>📝글쓰기</strong></h3>

      <div className="board-form-container">
        <form className="board-form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-group flex-nowrap input-group-lg">
              <span className="input-group-text" id="addon-wrapping">제목</span>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="input-group input-group-lg">
              <span className="input-group-text">내용</span>
              <textarea
                className="form-control"
                rows="3"
                name="mainText"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ resize: 'none', fontSize: '15px' }}
                required
              />
            </div>
          </div>
          <div className="form-group d-grid gap-2 d-md-flex justify-content-md-end">
            <div className="form-group button-group">
              <button type="submit" className="saveBtn">등록하기</button>
              <button type="button" className="listBtn" onClick={() => navigate('/board')}>목록보기</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBoard;