import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import Nav2 from '../components/Nav2';
import '../css/Note.css';

const NoteView = () => {
  const [cookies] = useCookies(['accessToken']);
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8082/api/v1/auth/y/noteDetail/${id}`, {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    })
      .then(response => {
        setNote(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the note!', error);
      });
  }, [id, cookies.accessToken]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Nav2 />
      </div>  
      <h3>📋 알림장 상세보기</h3>

      <div className="noteForm">
        <div className="section">
          <fieldset>
            <legend>🐶 강아지</legend>
            <div>{note.puppyName}</div>
          </fieldset>
          <br />

          <fieldset>
            <legend>📅 날짜</legend>
            <div>{note.noteDate}</div>
          </fieldset>
          <br />

          <fieldset>
            <legend>🦴 식사</legend>
            <label><input type="radio" readOnly checked={note.meal === "많이 먹음"} /> 많이 먹음 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.meal === "적당하게 먹음"} /> 적당하게 먹음 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.meal === "조금 먹음"} /> 조금 먹음 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.meal === "안먹음"} /> 안먹음 &nbsp;</label> 
          </fieldset>
          <br />

          <fieldset>
            <legend>💩 배변</legend>
            <label><input type="radio" readOnly checked={note.poopFrequency === "0회"} /> 0회 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopFrequency === "1회"} /> 1회 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopFrequency === "2회"} /> 2회 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopFrequency === "3회"} /> 3회 &nbsp;</label>
            <br />
            <label><input type="radio" readOnly checked={note.poopCondition === "건강"} /> 건강 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopCondition === "보통"} /> 보통 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopCondition === "나쁨"} /> 나쁨 &nbsp;</label>
            <label><input type="radio" readOnly checked={note.poopCondition === "설사"} /> 설사 &nbsp;</label>
          </fieldset>
          <br />

          <fieldset>
            <legend>🐕 컨디션</legend>
            <label><input type="radio" readOnly checked={note.mood === "좋음"} /> 좋음 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.mood === "보통"} /> 보통 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.mood === "피곤"} /> 피곤 &nbsp;</label> 
            <label><input type="radio" readOnly checked={note.mood === "나쁨"} /> 나쁨 &nbsp;</label> 
            <br />
          </fieldset>
          <br />

          <fieldset>
            <legend>💜 오늘 하루는</legend>
            <div>{note.daily}</div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default NoteView;
