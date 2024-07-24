import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import Nav2 from '../components/Nav2';
import '../css/NoteList.css';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../AxiosContext';   // Axios 인스턴스 가져오기


const NoteList = () => {
  const navigate = useNavigate();
  const axios = useAxios();  // Axios 인스턴스 사용
  const [cookies] = useCookies('accessToken');
  const [notes, setNotes] = useState([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 7;

    // 로그인 X
    useEffect(() => {
      // 토큰으로 로그인 검증
      if (!cookies.accessToken) {
        alert('로그인 해주세요!');
        navigate('/login');
        return;
      }
    
    // 로그인 O
    // AxiosInstace 사용 o
    axios.get('/api/v1/auth/y/note')
      .then(response => {
        // 역순으로 정렬하여 최신 노트가 위로 가도록 설정
        const sortedNotes = response.data.sort((a, b) => b.id - a.id);
        setNotes(sortedNotes);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, [axios]);


  // 페이지네이션
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // 알림장 상세보기
  let handleClick = (id) => {
    navigate(`/noteView/${id}`);
  };


  // 알림장 등록 버튼
  let handleCreateNote = () => {
    navigate('/createNote');
  };

  return (
    <>
      <div>
        <Nav2 /> 
      </div>  
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>📝알림장</h3>

      <div className="create-note-container">
        <button className="create-note-button" onClick={handleCreateNote}>알림장 등록</button>
      </div>

      <div className="note-list">
        {currentNotes.length > 0 ? (
          currentNotes.map((note, index) => (
            <div className="note-item" key={note.id} onClick={() => handleClick(note.id)}>
              <div className="note-id">🐾 {notes.length - (indexOfFirstNote + index)}</div>
              <div className="note-date">📅 {note.noteDate}</div>
              <div className="note-puppy">🐶 {note.puppyName}</div>
            </div>
          ))
        ) : (
          <div className="no-notes">등록된 알림장이 없습니다.</div>
        )}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(notes.length / notesPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default NoteList;