import React, { useEffect, useState } from "react";
import Nav2 from "../components/Nav2";
import { useCookies } from "react-cookie";
import axios from "axios";
import '../css/StoreList.css';  // CSS 파일 임포트

const StoreList = () => {
    const [cookies] = useCookies(["accessToken"]);
    const [dataList, setDataList] = useState([]);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [storesPerPage] = useState(8); // 페이지당 유치원 수 설정

    useEffect(() => {
        // 유치원 목록 불러오는 API
        axios.get('http://localhost:8082/api/v1/auth/y/store', {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            }
        })
        .then((res) => {
            console.log("유치원 목록 조회 성공!", res.data);
            setDataList(res.data);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }, [cookies.accessToken]);

    // 현재 페이지에 해당하는 유치원 목록 계산
    const indexOfLastStore = currentPage * storesPerPage;
    const indexOfFirstStore = indexOfLastStore - storesPerPage;
    const currentStores = dataList.slice(indexOfFirstStore, indexOfLastStore);

    // 페이지 번호 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / storesPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);    

    return (
        <>
            <Nav2 />
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                <strong>🏫 유치원 목록</strong>
            </h3>
            <div className="container-store">
                {dataList.length > 0 ? (
                    dataList.map((store) => (
                        <div key={store.id} className="card-store">
                            <div className="card-content">
                                <strong>이름 : </strong> {store.storeName}
                            </div>
                            <div className="card-content">
                                <strong>매니저 : </strong> {store.managerName}
                            </div>
                            <div className="card-content">
                                <strong>번호 : </strong> {store.storePhone}
                            </div>
                            <div className="card-content">
                                <strong>주소 : </strong> {store.storeAddr1}
                            </div>
                            <div className="card-content">
                                <strong>주소2 : </strong> {store.storeAddr2}
                            </div>
                        {/* <div className="card-buttons">
                                <button>상세보기</button>
                                <button>삭제</button>
                            </div>
                        */}
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>등록된 유치원이 없습니다.</p>
                )}
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className="page-link">
                        {number}
                    </button>
                ))}
            </div>
        </>
    )
}

export default StoreList;
