import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { useCookies } from "react-cookie";

let GalleryView = () => {
    let [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    let { id } = useParams(); // URL에서 id 파라미터를 가져옴
    let [imageData, setImageData] = useState(null); // 이미지 데이터 상태 변수

        // // 이미지 URL을 가져오는 requestImage 함수
        // let requestImage = async (data1) => {
        //     try {
        //         const res = await axios({
        //             url: `http://localhost:8082/api/v1/auth/y/gallery?id=${data1.id}`,
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': 'Bearer ' + cookies.accessToken
        //             }
        //         });
        //         return res.data.gallImg;
        //     } catch (error) {
        //         console.error("Error:", error);
        //     }
        // }
    
            // 이미지 URL을 가져오는 requestImage 함수
    // let requestImage = async (id) => {
    //     try {
    //         const res = await axios({
    //             url: `http://localhost:8082/api/v1/auth/y/galleryView?id=${id}`,
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': 'Bearer ' + cookies.accessToken
    //             }
    //         });
    //         console.log(res.data);
    //         console.log(imageData);
    //         return res.data;
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }

    useEffect(() => {
        // id를 사용하여 이미지의 상세 정보를 가져오는 API 호출
        axios.get(`http://localhost:8082/api/v1/auth/y/galleryView?id=${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        })
            .then((response) => {
                setImageData(response.data); // 응답 데이터 설정
                console.log(response.data);
                console.log(imageData);
            })
            .catch((error) => {
                console.log("1");
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
            <h3 style={{textAlign: 'center', marginTop: '20px'}}>📷사진첩 상세보기</h3>
            <div className="container">
                <div style={{ width: '18rem', margin: '20px auto' }}>
                    <img src={imageData.gall_img} alt="Gallery Image" />
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
