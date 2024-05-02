import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import { boardList } from '../../src/Data.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useCookies } from "react-cookie";

let GalleryList = props => {
    let [cookies, setCookies] = useCookies(['accessToken']);
    let [dataList, setDataList] = useState([]);
    let navigate = useNavigate();

//    useEffect(() => {
//        axios.get(`http://localhost:8082/api/v1/auth/y/gallery`), 
//             headers: {
//              'Content-Type': 'multipart/form-data',
//              'Authorization' : 'Bearer '+ cookies.accessToken
 //           }
//        .then(response => {
//            // API 응답 데이터를 상태에 설정
//            setDataList(response.data);
//        })
//        .catch(error => {
//            // 오류 처리
//            console.error('Error :', error);
//        });
//    }, []);

    useEffect(() => {
        axios({
            url: 'http://localhost:8082/api/v1/auth/y/gallery',
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              }
        })
        .then((res) => {
            setCookies('accessToken', res.data.accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
            console.log("이미지 불러오기 성공")
        //    if (res.status === 200) {
                setDataList(res.data); // 응답 데이터 설정
        //    }
        })
        .catch((error) => {
            alert("이미지 불러오기 실패");
            console.error("Error:", error);
        });
    }, []); // 의존성 배열을 빈 배열로 전달하여 최초 렌더링 시에만 실행되도록 설정

    let createGallery = () => {
        navigate('/createGallery');
    };
   
    return (
        <>
        <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>📷사진첩</strong></h3>
            <Container>
                {dataList.length > 0 ? (
                <Row className="justify-content-center">
                    {dataList.slice(0, 6).map((data, index) => (
                        <Col key={index} md={4}>
                            <Card style={{ width: '18rem', marginBottom: '20px' }}>
                                <Card.Img variant="top" src={`${data.gallImg}`} />
                                <Card.Body>
                                    <Card.Title>{`${data.gallDate}`}</Card.Title>
                                    <Card.Text>
                                        {`${data.fileName}`}
                                    </Card.Text>
                                    <Button variant="primary" href={`/galleryView/${data.id}`}>상세보기</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h3>아직 작성된 이미지가 없습니다🙄</h3>
                    </div>
                )}
            </Container>
            <div className="button-container">
            <div className="button-wrapper">
                <button className="creat-board-btn" onClick={createGallery}>📝작성하기</button>
            </div>
        </div>
        </>
    );

}


export default GalleryList;