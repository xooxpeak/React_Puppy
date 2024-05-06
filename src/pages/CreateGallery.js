import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Nav2 from "../components/Nav2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/CreateGallery.css'

let CreateGallery = () => {

    let [cookies, setCookies, removeCookies] = useCookies(['accessToken']);
    let [files, setFiles] = useState([]);
    let [selectedDate, setSelectedDate] = useState(null);

    let uploadOnChange = (e) => {
        setFiles(Array.from(e.target.files))
    }

    let handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const uploadFiles = (e) => {
        e.preventDefault();
        console.log(1);

        // FormData 객체 사용 : HTTP 요청에 첨부할 수 있는 키-값 쌍의 컬렉션
        const formData = new FormData();
    
        // append 메서드를 사용하여 FormData에 여러 개의 파일을 추가
        files.map((file) => {
          formData.append("file", file);
        });

        console.log(Array.from(formData));

        formData.append("date", selectedDate);

        axios.post('http://localhost:8082/api/v1/auth/y/createGallery', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : 'Bearer '+ cookies.accessToken
            }
          })
          .then((res) => {
              console.log(res.data);
              alert("이미지 업로드 성공!");
          }).catch((err) => {
              console.error(err);
              alert("이미지 업로드 실패");
          });
    }

    return (
        <>
        <div>
            <Nav2/>
        </div>
            <form>
                <h4><strong>사진첩 작성</strong></h4>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                />
                <input type="file" accept="image/*" onChange={uploadOnChange}/>
                <button label="이미지 업로드" onClick={uploadFiles}>작성하기</button>
            </form>
        </>
        );
};

export default CreateGallery;