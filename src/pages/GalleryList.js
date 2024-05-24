import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import AxiosInstance from "../api/AxiosInstance";
import '../css/GalleryList.css'

let GalleryList = (props) => {

    let [cookies] = useCookies(['accessToken']);
    let [dataList, setDataList] = useState([]);
    let [imageMap, setImageMap] = useState({}); // 이미지 데이터를 저장할 상태 변수
    let navigate = useNavigate();

    // AxiosInstance 사용 => default.get is not a function 오류
    // useEffect(() => {
    //     let fetchData = async () => {
    //         try {
    //             console.log("accessToken :", cookies.accessToken);
    //             let response = await AxiosInstance.get('/api/v1/auth/y/gallery');
    //             // let response = await AxiosInstance.request({
    //             //     url: '/api/v1/auth/y/gallery',
    //             //     method: 'GET'
    //             // });
    //             setDataList(response.data);
    //         } catch (error) {
    //             console.error("Error:", error);
    //             alert("이미지 불러오기 실패");
    //         }
    //     };

    //     fetchData();
    // }, []);


    // AxiosInstance 사용 XX
    useEffect(() => {
        axios({
            url: `http://localhost:8082/api/v1/auth/y/gallery`,
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              }
        })
        .then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log("이미지 불러오기 성공")
                setDataList(res.data); // 응답 데이터 설정
                // 각 이미지 데이터를 요청하여 상태로 저장
                res.data.forEach(data => {
                    requestImage(data.id).then(imageSrc => {
                        setImageMap(prevState => ({ ...prevState, [data.id]: imageSrc }));
                    });
                });
            }
        })
        .catch((error) => {
            alert("이미지 불러오기 실패");
            console.error("Error:", error);
        });
    }, []); // 의존성 배열을 빈 배열로 전달하여 최초 렌더링 시에만 실행되도록 설정


    // 이미지 URL을 가져오는 requestImage 함수
    let requestImage = async (imageId) => {
        try {
            const res = await axios({
                url: `http://localhost:8082/api/v1/auth/y/galleryView?id=${imageId}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + cookies.accessToken
                },
                responseType: 'arraybuffer'  // 바이트 배열로 응답 받기
            });
            
            const base64 = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const contentType = res.headers['content-type'];
            return `data:${contentType};base64,${base64}`;
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    let createGallery = () => {
        navigate('/createGallery');
    };

    
    // 사진첩 삭제
    let deleteGallery = (id) => {
        axios({
            url: `http://localhost:8082/api/v1/auth/y/gallery?id=${id}`,
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              }
        })
        .then((res) => {
            console.log("갤러리 삭제 성공");
            alert("해당 사진을 삭제하였습니다.")
            // fetchData();
            // 갤러리 목록 갱신
            setDataList(res.data); // 응답 데이터 설정
        })
        .catch((error) => {
            console.log("Error:", error);
            alert("갤러리 삭제 실패!")
        });
    };
   
    // 부트스트랩 사용 버전
    // return (
    //     <>
    //     <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>📷사진첩</strong></h3>
    //         <Container>
    //             {dataList.length > 0 ? (
    //             <Row className="justify-content-center">
    //                 {dataList.slice(0, 6).map((data, index) => (
    //                     <Col key={index} md={4}>
    //                         <Card style={{ width: '18rem', marginBottom: '20px' }}>
    //                             <Card.Img variant="top" src={`${data.gall_img}`} alt="Gallery Image"/>
    //                             <Card.Body>
    //                                 <Card.Title>{`${data.gall_date}`}</Card.Title>
    //                                 <Card.Text>
    //                                     {`${data.fileName}`}
    //                                 </Card.Text>
    //                                 <Button variant="primary" href={`/galleryView/${data.id}`}>상세보기</Button>
    //                             </Card.Body>
    //                         </Card>
    //                     </Col>
    //                 ))}
    //             </Row>
    //             ) : (
    //                 <div style={{ textAlign: 'center', marginTop: '50px' }}>
    //                     <h3>아직 작성된 이미지가 없습니다🙄</h3>
    //                 </div>
    //             )}
    //         </Container>
    //         <div className="button-container">
    //         <div className="button-wrapper">
    //             <button className="creat-board-btn" onClick={createGallery}>📝작성하기</button>
    //         </div>
    //     </div>
    //     </>
    // );

    // 부트스트랩 사용 xx
    return (
        <>
            <h3>📷사진첩</h3>
            <div className="container">
                {dataList.length > 0 ? (
                    <div className="row justify-content-center">
                        {dataList.slice(0, 9).map((data, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    {imageMap[data.id] ? (
                                        <img className="card-img-top" src={imageMap[data.id]} alt="Gallery Image"/>
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{`${data.gall_date}`}</h5>
                                        <p className="card-text">{`${data.id}`}</p>
                                        
                                        <div className="button-group">
                                            <Link to={`/galleryView/${data.id}`} className="btn btn-primary">상세보기</Link>
                                            <button onClick={() => deleteGallery(data.id)} className="btn btn-danger">삭제하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h3>아직 작성된 이미지가 없습니다🙄</h3>
                    </div>
                )}
            </div>
            <div className="button-container">
                <div className="button-wrapper">
                    <button className="creat-board-btn" onClick={createGallery}>📝작성하기</button>
                </div>
            </div>
        </>
    );

}


export default GalleryList;