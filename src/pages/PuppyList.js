import React, { useState, useEffect } from "react";
import Nav2 from "../components/Nav2";
import axios from "axios";
import { useCookies } from "react-cookie";

let PuppyList = () => {
    const [cookies] = useCookies(['accessToken']);
    const [puppies, setPuppies] = useState([]); // 강아지 목록을 위한 상태

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
    }, [cookies.accessToken]);

    return (
        <>
            <div>
                <Nav2 />
            </div>
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                <strong>우리 아이 정보</strong>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                {puppies.map((puppy) => (
                    <div key={puppy.id} style={{ maxWidth: "600px", width: "100%", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9", marginBottom: "20px" }}>
                        <div style={{ textAlign: "center" }}>
                            {puppy.profile_img && <img src={puppy.profile_img} alt={puppy.puppy_name} style={{ width: "150px", height: "150px", borderRadius: "50%" }} />}
                        </div>
                        <div style={{ marginTop: "10px"}}>
                            <strong>이름 : </strong> {puppy.puppy_name}
                        </div>
                        <div>
                            <strong>성별 : </strong> {puppy.gender}
                        </div>
                        <div>
                        <strong>중성화 : </strong> {puppy.neutering ? "O" : "X"}
                        </div>
                        <div>
                            <strong>생일 : </strong> {puppy.puppy_birth}
                        </div>
                        <div>
                            <strong>견종 : </strong> {puppy.breed}
                        </div>
                        <div>
                            <strong>알레르기 : </strong> {puppy.allergy}
                        </div>
                        <div>
                            <strong>성격 : </strong> {puppy.personality}
                        </div>
                        <div>
                            <strong>소개 : </strong> {puppy.introduction}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PuppyList;
