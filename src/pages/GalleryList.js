import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from "react-cookie";
import '../css/GalleryList.css'
import { useAxios } from '../AxiosContext'; // Axios 인스턴스 가져오기

let GalleryList = () => {
    const [cookies] = useCookies(['accessToken']);
    let [dataList, setDataList] = useState([]);
    let [imageMap, setImageMap] = useState({}); // 이미지 데이터를 저장할 상태 변수
    
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [galleriesPerPage] = useState(9); // 페이지 당 표시할 갤러리 수 설정
    
    let navigate = useNavigate();
    const axios = useAxios(); // Axios 인스턴스 사용

    useEffect(() => {
        // 로그인 X
        if (!cookies.accessToken) {
            alert('로그인 해주세요!');
            navigate('/login');
            return;
        }

        // 로그인 O
        axios.get('/api/v1/auth/y/gallery')
        .then((res) => {
            console.log("이미지 불러오기 성공")
            setDataList(res.data); // 응답 데이터 설정
            // 각 이미지 데이터를 요청하여 상태로 저장
            res.data.forEach(data => {
                requestImage(data.id).then(imageSrc => {
                    setImageMap(prevState => ({ ...prevState, [data.id]: imageSrc }));
                });
            });
        })
        .catch((error) => {
            console.error("토큰 갱신 or Error:", error);
        });
    }, [axios]);

    // 이미지 URL을 가져오는 requestImage 함수
    let requestImage = async (imageId) => {
        try {
            const res = await axios.get(`/api/v1/auth/y/galleryView?id=${imageId}`, {
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
    const deleteGallery = (id) => {
        axios.delete(`/api/v1/auth/y/deleteGallery?id=${id}`)
        .then((res) => {
            console.log("갤러리 삭제 성공");
            alert("해당 사진을 삭제하였습니다.");
            setDataList(dataList.filter(gallery => gallery.id !== id)); // 삭제된 갤러리 제외
        })
        .catch((error) => {
            console.log("Error:", error);
            alert("갤러리 삭제 실패!");
        });
    };

    // 페이지네이션
    // 현재 페이지에 해당하는 갤러리 목록을 계산
    const indexOfLastGallery = currentPage * galleriesPerPage;
    const indexOfFirstGallery = indexOfLastGallery - galleriesPerPage;
    const currentGalleries = dataList.slice(indexOfFirstGallery, indexOfLastGallery);
    
    // 페이지 번호를 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / galleriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <h3>📷사진첩</h3>
            <div className="container">
                {dataList.length > 0 ? (
                    <div className="row justify-content-center">
                        {currentGalleries.map((data, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card gallery-card">
                                    {imageMap[data.id] ? (
                                        <img className="card-img-top gall-card-img" src={imageMap[data.id]} alt="Gallery Image"/>
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
            <div className="d-flex justify-content-center">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
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