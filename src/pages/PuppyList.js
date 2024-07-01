import React, { useState, useEffect } from "react";
import Nav2 from "../components/Nav2";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from 'react-router-dom';
import "../css/PuppyList.css"; 

let PuppyList = () => {
    let navigate = useNavigate();
    let [cookies] = useCookies(['accessToken']);
    let [puppies, setPuppies] = useState([]); // 강아지 목록을 위한 상태
    let { id } = useParams();  // URL 파라미터에서 게시글 ID를 가져옴

    // 서버로부터 해당 사용자의 강아지 목록을 가져옴
    useEffect(() => {
        axios({
            url: `http://localhost:8082/api/v1/auth/y/puppy`,
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer '+ cookies.accessToken
              },
        })
            .then((res) => {
                const puppies = res.data;
                console.log("API Response:", puppies); 
                setPuppies(puppies);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [id, cookies.accessToken]);

    // 강아지 정보 수정 페이지로 이동
    let edit = (id) => {
        console.log(id);
        navigate(`/editPuppy/${id}`);
    };

    // 강아지 삭제
    let del = (id) => {
        axios.delete(`http://localhost:8082/api/v1/auth/y/deletePuppy?id=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + cookies.accessToken
                    }
        })
        .then(() => {
            console.log("강아지 삭제 성공!");
            alert("강아지 정보를 삭제했습니다 🗑️");
            navigate("/puppy");
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
    };

    return (
        <>
            <div>
                <Nav2 />
            </div>
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                <strong>강아지 정보 🩷</strong>
            </h3>
            <div className="container-puppy">
                {puppies.map((puppy) => (
                    <div key={puppy.id} className="card-puppy">
                        <div className="card-content">
                            {puppy.profile_img && <img src={puppy.profile_img} alt={puppy.puppy_name} />}
                        </div>
                        <div className="card-content">
                            <strong>이름 : </strong> {puppy.puppy_name}
                        </div>
                        <div className="card-content">
                            <strong>성별 : </strong> {puppy.gender}
                        </div>
                        <div className="card-content">
                            <strong>중성화 : </strong> {puppy.neutering ? "O" : "X"}
                        </div>
                        <div className="card-content">
                            <strong>생일 : </strong> {puppy.puppy_birth}
                        </div>
                        <div className="card-content">
                            <strong>견종 : </strong> {puppy.breed}
                        </div>
                        <div className="card-content">
                            <strong>알레르기 : </strong> {puppy.allergy}
                        </div>
                        <div className="card-content">
                            <strong>성격 : </strong> {puppy.personality}
                        </div>
                        <div className="card-content">
                            <strong>소개 : </strong> {puppy.introduction}
                        </div>
                        <div className="card-buttons">
                            <button onClick={() => edit(puppy.id)}>수정</button>
                            <button className="del" onClick={() => del(puppy.id)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PuppyList;
