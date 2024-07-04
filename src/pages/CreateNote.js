import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Nav2 from '../components/Nav2';
import '../css/Note.css';

const CreateNote = () => {
  const [cookies] = useCookies(['accessToken']);
  const [newNote, setNewNote] = useState({
    noteDate: '',
    meal: '',
    poopFrequency: '',
    poopCondition: '',
    mood: '',
    daily: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8082/api/v1/auth/y/saveNote', newNote, {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    })
      .then(response => {
        setNewNote({
          noteDate: '',
          meal: '',
          poopFrequency: '',
          poopCondition: '',
          mood: '',
          daily: ''
        });
      })
      .catch(error => {
        console.error('There was an error creating the note!', error);
      });
  };

  return (
    <>
      <div>
        <Nav2 /> 
      </div>  
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>📝알림장</h3>

      <form className="noteForm" onSubmit={handleSubmit}>
        <div className="section">
          <fieldset>
            <legend>🦴 식사</legend> 
            <label><input type="radio" name="meal" value="많이 먹음" onChange={handleInputChange} /> 많이 먹음 &nbsp;</label> 
            <label><input type="radio" name="meal" value="적당하게 먹음" onChange={handleInputChange} /> 적당하게 먹음 &nbsp;</label> 
            <label><input type="radio" name="meal" value="조금 먹음" onChange={handleInputChange} /> 조금 먹음 &nbsp;</label> 
            <label><input type="radio" name="meal" value="안먹음" onChange={handleInputChange} /> 안먹음 &nbsp;</label> 
          </fieldset>
          <br />

          <fieldset>
            <legend>💩 배변</legend>
            <label><input type="radio" name="poopFrequency" value="0회" onChange={handleInputChange} /> 0회 &nbsp;</label>
            <label><input type="radio" name="poopFrequency" value="1회" onChange={handleInputChange} /> 1회 &nbsp;</label>
            <label><input type="radio" name="poopFrequency" value="2회" onChange={handleInputChange} /> 2회 &nbsp;</label>
            <label><input type="radio" name="poopFrequency" value="3회" onChange={handleInputChange} /> 3회 &nbsp;</label>
            <br />
            <label><input type="radio" name="poopCondition" value="건강" onChange={handleInputChange} /> 건강 &nbsp;</label>
            <label><input type="radio" name="poopCondition" value="보통" onChange={handleInputChange} /> 보통 &nbsp;</label>
            <label><input type="radio" name="poopCondition" value="나쁨" onChange={handleInputChange} /> 나쁨 &nbsp;</label>
            <label><input type="radio" name="poopCondition" value="설사" onChange={handleInputChange} /> 설사 &nbsp;</label>
          </fieldset>
          <br />

          <fieldset>
            <legend>🐾 컨디션</legend>
            <label><input type="radio" name="mood" value="좋음" onChange={handleInputChange} /> 좋음 &nbsp;</label> 
            <label><input type="radio" name="mood" value="보통" onChange={handleInputChange} /> 보통 &nbsp;</label> 
            <label><input type="radio" name="mood" value="피곤" onChange={handleInputChange} /> 피곤 &nbsp;</label> 
            <label><input type="radio" name="mood" value="나쁨" onChange={handleInputChange} /> 나쁨 &nbsp;</label> 
            <br />
          </fieldset>
          <br />

          <fieldset>
            <legend>💜 오늘 하루는</legend>
            <textarea name="daily" value={newNote.daily} onChange={handleInputChange}></textarea>
          </fieldset>
        </div>
        <button type="submit">작성하기</button>
      </form>
    </>
  );
};

export default CreateNote;
