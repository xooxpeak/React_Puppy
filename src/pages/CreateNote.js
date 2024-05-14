import React, { useState, useEffect } from 'react';
import Nav2 from '../components/Nav2';
import '../css/Note.css'; 
import axios from 'axios';

let CreateNote = () => {

  let [note, setNote] = useState({
    meal: [],
    poop: { frequency: '', condition: '' },
    condition: '',
    daily: ''
  });

  let handleChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === 'meal') {
      if (checked) {
        setNote(prevNote => ({
          ...prevNote,
          meal: [...prevNote.meal, value] // 이전의 meal 배열에 새로운 value 추가
        }));
      } else {
        setNote(prevNote => ({
          ...prevNote,
          meal: prevNote.meal.filter(item => item !== value) // 선택 해제된 value를 meal 배열에서 제거
        }));
      }
    } else if (name === 'poopFrequency') {
      setNote(prevNote => ({
        ...prevNote,
        poop: {
          ...prevNote.poop,
          frequency: value
        }
      }));
    } else if (name === 'poopCondition') {
      setNote(prevNote => ({
        ...prevNote,
        poop: {
          ...prevNote.poop,
          condition: value
        }
      }));
    } else if (name === 'condition' || name === 'daily') {
      setNote(prevNote => ({
        ...prevNote,
        [name]: value
      }));
    }
  };

      // useState 훅으로 관리되는 user 객체의 속성을 업데이트하는 함수
    //   let onChangeNoteData = (e) => {
    //     setNote({...note, [e.target.name] : e.target.value})
    //     console.log(note);
    // }

    // useEffect(() => {
    //   console.log(note);
    // }, [note]); // note 상태가 변경될 때마다 useEffect가 실행됩니다.
    
  

    // axios를 사용하여 HTTP POST 요청을 보냄
    let create = () => {
      axios.post('http://localhost:8082/api/v1/auth/n/createNote', {
          data: note
      }).then((res) => {
          console.log('성공', res.data);
          alert("노트 작성 성공!");
          setNote(res.data);
      }).catch((error) => {
          console.log("Error:", error);
      });
  }

  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted Note:', note);

  //   // axios를 사용하여 서버로 데이터를 전송
  //   axios.post('http://localhost:8082/api/v1/auth/n/createPuppyNote', note)
  //   .then((res) => {
  //     console.log('성공', res.data);
  //     setNote(res.data);
  //     // 성공적으로 서버에 데이터를 전송한 후에 할 일을 여기에 추가하세요.
  //   })
  //   .catch((error) => {
  //     console.error('Error submitting note:', error);
  //   });
  // };

  return (
    <>
    <div>
        <Nav2 /> 
    </div>  
    <h3 style={{textAlign: 'center', marginTop: '20px'}}>📝알림장</h3>

        <form className="noteForm">
        <div className="section">
            <fieldset>
              <legend>🦴 식사</legend> 
              <label><input type="checkbox" name="meal" value="1" onChange={handleChange} /> 아침식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="2" onChange={handleChange} /> 점심식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="3" onChange={handleChange} /> 저녁식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="4" onChange={handleChange} /> 간식 &nbsp;</label> 
            </fieldset>
              <br />

            <fieldset>
              <legend>💩 배변</legend>
              <label><input type="checkbox" name="poopFrequency" value="0" onChange={handleChange} /> 0회 &nbsp;</label>
              <label><input type="checkbox" name="poopFrequency" value="1" onChange={handleChange} /> 1회 &nbsp;</label>
              <label><input type="checkbox" name="poopFrequency" value="2" onChange={handleChange} /> 2회 &nbsp;</label>
              <label><input type="checkbox" name="poopFrequency" value="3" onChange={handleChange} /> 3회 &nbsp;</label>
              <br />
              <label><input type="checkbox" name="poopCondition" value="Good" onChange={handleChange} /> 건강 &nbsp;</label>
              <label><input type="checkbox" name="poopCondition" value="Normal" onChange={handleChange} /> 보통 &nbsp;</label>
              <label><input type="checkbox" name="poopCondition" value="Bad" onChange={handleChange} /> 나쁨 &nbsp;</label>
              <label><input type="checkbox" name="poopCondition" value="Diarrhea" onChange={handleChange} /> 설사 &nbsp;</label>
            </fieldset>
              <br />

            <fieldset>
              <legend>🐾 컨디션</legend>
              <label><input type="checkbox" name="condition" value="Good" onChange={handleChange} /> 좋음   &nbsp;</label> 
              <label><input type="checkbox" name="condition" value="Normal" onChange={handleChange} /> 보통 &nbsp;</label> 
              <label><input type="checkbox" name="condition" value="Tired" onChange={handleChange} /> 피곤 &nbsp;</label> 
              <label><input type="checkbox" name="condition" value="Bad" onChange={handleChange} /> 나쁨 &nbsp;</label> 
              <br />
            </fieldset>
            <br />

        <fieldset>
            <legend>💜 오늘 하루는</legend>
            <textarea name="daily" id="daily" value={note.daily} onChange={handleChange}></textarea>
        </fieldset>
        </div>
        <button type="button" onClick={create}>작성하기</button>
        </form>
    </>
  );
};

export default CreateNote;
