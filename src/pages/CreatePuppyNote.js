import React, { useState } from 'react';
import Nav2 from '../components/Nav2';
import '../css/PuppyNote.css'; 

let CreatePuppyNote = () => {

  let [note, setNote] = useState({
    meal: '',
    poop: { frequency: '', condition: '' },
    condition: '',
    daily: ''
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'meal' || name === 'condition' || name === 'daily') {
      setNote(prevNote => ({
        ...prevNote,
        [name]: value
      }));
    } else if (name === 'poopFrequency' || name === 'poopCondition') {
      setNote(prevNote => ({
        ...prevNote,
        poop: {
          ...prevNote.poop,
          [name === 'poopFrequency' ? 'frequency' : 'condition']: value
        }
      }));
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Note:', note);
    // 여기에 제출된 노트를 처리하는 코드를 추가할 수 있습니다.
  };

  return (
    <>
    <div>
        <Nav2 /> 
    </div>  
    <h3 style={{textAlign: 'center', marginTop: '20px'}}>📝알림장</h3>

        <form className="noteForm" onSubmit={handleSubmit}>
        <div className="section">
            <fieldset>
              <legend>🦴 식사</legend> 
              <label><input type="checkbox" name="meal" value="0" onChange={handleChange} /> 아침식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="1" onChange={handleChange} /> 점심식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="2" onChange={handleChange} /> 저녁식사 &nbsp;</label> 
              <label><input type="checkbox" name="meal" value="3" onChange={handleChange} /> 간식 &nbsp;</label> 
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
        <button type="submit">작성하기</button>
        </form>
    </>
  );
};

export default CreatePuppyNote;
