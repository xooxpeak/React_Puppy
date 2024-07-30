import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Nav2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/CreateGallery.css';
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let CreateGallery = () => {
    let [cookies] = useCookies(['accessToken']);
    let [files, setFiles] = useState([]);
    let [selectedDate, setSelectedDate] = useState(null);
    let [imagePreviews, setImagePreviews] = useState([]); // 여러 이미지 미리보기를 위한 상태 변수
    let navigate = useNavigate(); // useNavigate 훅 사용
    const axios = useAxios(); // Axios 인스턴스 사용

    // 여러 파일 선택 시 호출되는 함수
    let uploadOnChange = (e) => {
        let selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);  // 선택된 파일 목록을 상태 변수 files에 저장함

        // 선택된 파일들의 미리보기를 표시함
        let previews = selectedFiles.map((file) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(previews).then((images) => {
            setImagePreviews(images);
        });
    };    

    // 날짜 선택 시 호출되는 함수
    let handleDateChange = (date) => {
        setSelectedDate(date);
      };

    // 파일 업로드를 처리하는 함수  
    const uploadFiles = (e) => {
        e.preventDefault();

        // FormData 객체 사용 : HTTP 요청에 첨부할 수 있는 키-값 쌍의 컬렉션
        const formData = new FormData();
    
        // append 메서드를 사용하여 FormData에 여러 개의 파일을 추가
        files.map((file) => {
          formData.append("file", file);
        });

        console.log(Array.from(formData));

        formData.append("date", selectedDate);

        axios.post('/api/v1/auth/y/createGallery', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
              console.log(res.data);
              alert("이미지 업로드 성공!");
              navigate("/gallery");  // 사진첩 목록으로 이동
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

        <h3>📷사진첩 작성</h3>
        <div className="CreateGallery-wrapper">
            <form className="CreateGallery-container">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                />
                <hr></hr>
                {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Uploaded ${index}`} style={{ width: "150px", height: "100px", margin: "5px" }} />
                ))}
                <hr></hr>
                <input type="file" accept="image/*" multiple onChange={uploadOnChange}/>
                <button label="이미지 업로드" onClick={uploadFiles}>작성하기</button>
            </form>
        </div>
        </>
    );
};

export default CreateGallery;
