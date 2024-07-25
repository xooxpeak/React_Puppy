import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav2 from "../components/Nav2";
import '../css/GalleryView.css';
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let GalleryView = () => {
    let { id } = useParams(); // URL에서 id 파라미터를 가져옴
    let [imageSrc, setImageSrc] = useState(''); // Base64 인코딩된 이미지 데이터 상태 변수
    let [imageData, setImageData] = useState(null); // 이미지 메타 데이터 상태 변수
    const axios = useAxios(); // Axios 인스턴스 사용

    // id를 사용하여 이미지의 상세 정보를 가져오는 API 호출
    // 바이트 코드로 받아온 이미지를 Base64 문자열로 인코딩
    useEffect(() => {
        axios.get(`/api/v1/auth/y/galleryView?id=${id}`, {
            responseType: 'arraybuffer' // 이미지 데이터를 바이트 배열로 받음
        })
            .then((response) => {
                // 이미지 데이터를 Base64 인코딩
                const base64 = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                const contentType = response.headers['content-type'];
                setImageSrc(`data:${contentType};base64,${base64}`); // Base64 인코딩된 데이터 URL 설정
                
                // 갤러리 엔티티에서 메타 데이터 설정 
                setImageData({
                    gall_date: response.headers['gall_date'], // 헤더에서 날짜 정보 가져오기
                    fileName: response.headers['file_name'] // 헤더에서 파일명 정보 가져오기
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("이미지 상세 정보 불러오기 실패");
            });
    }, [id, axios]); // 의존성 배열에 id와 axios를 포함하여 id가 변경될 때마다 useEffect가 실행되도록 설정

    // 이미지 데이터가 로드되지 않았을 경우 로딩 상태 표시
    if (!imageData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div>
            <Nav2 />
        </div>
            <h3>📷사진첩 상세보기</h3>
            <div className="gallery-container">
                <div className="gallery-content">
                    <img src={imageSrc} alt="Gallery Image" className="gallery-image"/>
                    <div>
                        <h4>{imageData.gall_date}</h4>
                        <p>{imageData.fileName}</p>
                        {/* 상세보기 페이지에서 뒤로 가기 버튼 */}
                        <button className="back-button" onClick={() => window.history.back()}>뒤로 가기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GalleryView;
