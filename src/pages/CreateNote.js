import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav2 from '../components/Nav2';
import '../css/Note.css';
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

const CreateNote = () => {
  const navigate = useNavigate();
  const [puppies, setPuppies] = useState([]);
  const [newNote, setNewNote] = useState({
    noteDate: '',
    meal: '',
    poopFrequency: '',
    poopCondition: '',
    mood: '',
    daily: '',
    puppyId: ''
  });

  const axios = useAxios(); // Axios 인스턴스 사용

  // 강아지 전체 목록 불러오기
  useEffect(() => {
    axios.get('/api/v1/auth/y/puppies')
      .then(response => {
        setPuppies(response.data);
      })
      .catch(error => {
        console.error('강아지 목록 불러오기 오류!', error);
      });
  }, [axios]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 알림장 저장
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/v1/auth/y/saveNote', newNote)
      .then((response) => {
        setNewNote({
          noteDate: '',
          meal: '',
          poopFrequency: '',
          poopCondition: '',
          mood: '',
          daily: '',
          puppyId: ''
        });
        console.log(response.data);
        navigate('/noteList');
        alert("알림장 등록 완료!");
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };

  return (
    <>
      <div>
        <Nav2 /> 
      </div>  
      <h3>📝알림장</h3>

      <form className="noteForm" onSubmit={handleSubmit}>
        <div className="section">
          <fieldset>
            <legend>🐶 강아지 선택</legend>
            <select name="puppyId" value={newNote.puppyId} onChange={handleInputChange} required>
              <option value="">강아지를 선택하세요</option>
              {puppies.map(puppy => (
                <option key={puppy.id} value={puppy.id}>{puppy.puppy_name}</option>
              ))}
            </select>
          </fieldset>
          <br />

          <fieldset>
            <legend>📅 날짜</legend>
            <input 
              type="date" 
              name="noteDate" 
              value={newNote.noteDate} 
              onChange={handleInputChange} 
              required 
            />
          </fieldset>
          <br />

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
            <legend>🐕 컨디션</legend>
            <label><input type="radio" name="mood" value="좋음" onChange={handleInputChange} /> 좋음 &nbsp;</label> 
            <label><input type="radio" name="mood" value="보통" onChange={handleInputChange} /> 보통 &nbsp;</label> 
            <label><input type="radio" name="mood" value="피곤" onChange={handleInputChange} /> 피곤 &nbsp;</label> 
            <label><input type="radio" name="mood" value="나쁨" onChange={handleInputChange} /> 나쁨 &nbsp;</label> 
            <br />
          </fieldset>
          <br />

          <fieldset>
            <legend>💜 오늘 하루는</legend>
            <textarea id="daily" name="daily" value={newNote.daily} onChange={handleInputChange}></textarea>
          </fieldset>
        </div>
        <button type="submit">작성하기</button>
      </form>
    </>
  );
};

export default CreateNote;
