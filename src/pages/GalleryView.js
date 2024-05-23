import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import Nav2 from "../components/Nav2";

let GalleryView = () => {
    let [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    let { id } = useParams(); // URL에서 id 파라미터를 가져옴
    let [imageSrc, setImageSrc] = useState(''); // Base64 인코딩된 이미지 데이터 상태 변수
    let [imageData, setImageData] = useState(null); // 이미지 메타 데이터 상태 변수

    // id를 사용하여 이미지의 상세 정보를 가져오는 API 호출
    // 바이트 코드로 받아온 이미지를 Base64 문자열로 인코딩
    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/auth/y/galleryView?id=${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            },
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
    }, [id]); // 의존성 배열에 id를 포함하여 id가 변경될 때마다 useEffect가 실행되도록 설정


    // 이미지 데이터가 로드되지 않았을 경우 로딩 상태 표시
    if (!imageData) {
        return <div>Loading...</div>;
    }

    // 이미지 상세 정보를 보여주는 컴포넌트 반환
    // return (
    //     <>
    //     <h3 style={{textAlign: 'center', marginTop: '20px'}}>📷사진첩 상세보기</h3>
    //     <div className="container">
    //         <Card style={{ width: '18rem', margin: '20px auto' }}>
    //             <Card.Img variant="top" src={imageData.gall_img} alt="Gallery Image" />
    //             <Card.Body>
    //                 <Card.Title>{imageData.gall_date}</Card.Title>
    //                 <Card.Text>
    //                     {imageData.fileName}
    //                 </Card.Text>
    //                 {/* 상세보기 페이지에서 뒤로 가기 버튼 */}
    //                 <Button variant="primary" onClick={() => window.history.back()}>뒤로 가기</Button>
    //             </Card.Body>
    //         </Card>
    //     </div>
    //     </>
    // );
    return (
        <>
        <div>
            <Nav2 />
        </div>
            <h3 style={{textAlign: 'center', marginTop: '20px'}}>📷사진첩 상세보기</h3>
            <div className="container"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px)' }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={imageSrc} alt="Gallery Image"  style={{ maxWidth: '100%', height: 'auto', maxHeight: '70vh' }}/>
                    <div>
                        <h4>{imageData.gall_date}</h4>
                        <p>{imageData.fileName}</p>
                        {/* 상세보기 페이지에서 뒤로 가기 버튼 */}
                        <button onClick={() => window.history.back()}>뒤로 가기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GalleryView;
