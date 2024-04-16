import React from "react";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
let Gallery = () => {

    let [files, setFiles] = useState([]);

    let uploadOnChange = (e) => {
        setFiles(Array.from(e.target.files))
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        console.log(1);

        // FormData 객체 사용 : HTTP 요청에 첨부할 수 있는 키-값 쌍의 컬렉션
        const formData = new FormData();
    
        // append 메서드를 사용하여 FormData에 여러 개의 파일을 추가
        files.map((file) => {
          formData.append("files", file);
        });

        console.log(Array.from(formData));

        axios.post('http://localhost:8082/api/v1/auth/y/createGallery', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accessToken' : Cookies.accessToken
            }
          })
          .then((res) => {
              console.log(res.data);
          }).catch((err) => {
              console.error(err);
          });
    }


        return (
        <>
        <div>
            <Nav2/>
        </div>
            <h1>Gallery</h1>
            <input type="file" accept="image/*" onChange={uploadOnChange}/>
            <button label="이미지 업로드" onClick={uploadFiles}>submit</button>
        </>
        )
}

export default Gallery;