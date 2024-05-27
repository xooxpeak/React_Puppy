import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Nav2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/CreateGallery.css'

let CreateGallery = () => {

    let [cookies] = useCookies(['accessToken']);
    let [files, setFiles] = useState([]);
    let [selectedDate, setSelectedDate] = useState(null);
    // let [imagePreview, setImagePreview] = useState([null]); // 이미지 미리보기를 위한 상태 변수
    let [imagePreviews, setImagePreviews] = useState([]); //  여러 이미지 미리보기를 위한 상태 변수
    let navigate = useNavigate(); // useNavigate 훅 사용

    // 파일 선택 시 호출되는 함수
    // let uploadOnChange = (e) => {
    //     setFiles(Array.from(e.target.files))  // 선택된 파일 목록을 상태 변수 files에 저장함
    
    //         // 선택된 파일 중 첫 번째 파일의 미리보기를 표시함
    //         if (e.target.files.length > 0) {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 setImagePreview(e.target.result);
    //             };
    //             reader.readAsDataURL(e.target.files[0]);
    //         }
    // }

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

        axios.post('http://localhost:8082/api/v1/auth/y/createGallery', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : 'Bearer '+ cookies.accessToken
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
                {/* <h4><strong>사진첩 작성</strong></h4> */}
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                />
                <hr></hr>
                {/* 이미지 미리보기 */}
               {/* {imagePreview && <img src={imagePreview} alt="Uploaded" style={{ width: "300px", height: "150px" }} />} */}
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