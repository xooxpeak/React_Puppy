import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import AxiosInstance from "../api/AxiosInstance";

let GalleryList = (props) => {

    let [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    let [dataList, setDataList] = useState([]);
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

    // requestImage 함수
    let requestImage = (data1) => {
        axios({
            url: `http://localhost:8082/api/v1/auth/y/gallery?id=${data1.id}`,
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              }
        })
        .then((res) => {
            return res.data.gallImg
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

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
            }
        })
        .catch((error) => {
            alert("이미지 불러오기 실패");
            console.error("Error:", error);
        });
    }, []); // 의존성 배열을 빈 배열로 전달하여 최초 렌더링 시에만 실행되도록 설정

    useEffect(() => {
        console.log(dataList)
    }, [dataList])

    let createGallery = () => {
        navigate('/createGallery');
    };

    
    // 사진첩 삭제
    let deleteGallery = (id) => {
        axios({
            url: `http://localhost:8082/api/v1/auth/y/gallery/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              }
        })
        .then((res) => {
            console.log("갤러리 삭제 성공");
            alert("해당 사진을 삭제하였습니다.")
            // 삭제 후 남은 갤러리 목록을 다시 불러옴
            // fetchData();
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
            <h3 style={{textAlign: 'center', marginTop: '20px'}}>📷사진첩</h3>
            <div className="container">
                {dataList.length > 0 ? (
                    <div className="row justify-content-center">
                        {dataList.slice(0, 9).map((data, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card" style={{ width: '18rem', marginBottom: '20px' }}>
                                    <img className="card-img-top" src={requestImage(data)} alt="Gallery Image"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{`${data.gall_date}`}</h5>
                                        <p className="card-text">{`${data.fileName}`}</p>
                                        <a href={`/galleryView/${data.id}`} className="btn btn-primary">상세보기</a>
                                        <button onClick={() => deleteGallery(data.id)} className="btn btn-danger">삭제하기</button>
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