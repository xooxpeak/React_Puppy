import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav2 from "../components/Nav2";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import '../css/RegisterPuppy.css';

let EditPuppy = () => {
    let { id } = useParams();
    let [cookies] = useCookies(["accessToken"]);
    let navigate = useNavigate();

    // 폼 데이터를 담을 상태
    let [formData, setFormData] = useState({
        puppy_name: "",
        gender: "",
        neutering: "",
        puppy_birth: "",
        breed: "",
        allergy: "",
        personality: "",
        introduction: "",
        profile_img: ""
    });

    const [loading, setLoading] = useState(true);

    // 서버로부터 해당 강아지 정보를 가져옴
    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/auth/y/getPuppy?id=${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        })
        .then((res) => {
            // const { puppy } = res.data;
            // console.log(puppy);
            console.log(res.data);
            setFormData({
                puppy_name: res.data.puppy_name || "",
                gender: res.data.gender || "",
                neutering: res.data.neutering || "",
                puppy_birth: res.data.puppy_birth || "",
                breed: res.data.breed || "",
                allergy: res.data.allergy || "",
                personality: res.data.personality || "",
                introduction: res.data.introduction || "",
                profile_img: res.data.profile_img || ""
            });
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    }, [id, cookies.accessToken]);

    // 입력 필드의 변경을 처리하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // 강아지 정보 수정을 처리하는 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8082/api/v1/auth/y/editPuppy?id=${id}`, formData, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        })
        .then((res) => {
            alert("강아지 정보가 성공적으로 수정되었습니다!");
            navigate("/puppy"); // 수정 완료 후 목록 페이지로 이동
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    };

    const { puppy_name, breed, gender, neutering, puppy_birth, allergy, personality, introduction } = formData;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <Nav2 />
            </div>
            <div>
                <h3 style={{ textAlign: "center", marginTop: "20px" }}><strong>강아지 정보 수정하기</strong></h3>
            </div>
            <form className="registerPuppyForm" onSubmit={handleSubmit}>
                {/* 이름 */}
                <div>
                    <input type="text" className="input-puppy" name="puppy_name" value={formData.puppy_name} onChange={handleChange} placeholder="이름" autoFocus required />
                </div>

                {/* 성별 */}
                <div className="neutering-container">
                    <span className="neutering">성별</span>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            checked={formData.gender === "M"}
                            onChange={handleChange}
                            required
                        />
                        남
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={formData.gender === "F"}
                            onChange={handleChange}
                            required
                        />
                        여
                    </label>
                </div>

                {/* 중성화 여부 */}
                <div className="neutering-container">
                    <span className="neutering">중성화</span>
                    <label>
                        <input
                            type="radio"
                            name="neutering"
                            value="Y"
                            checked={formData.neutering === "Y"}
                            onChange={handleChange}
                            required
                        />
                        Y
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="neutering"
                            value="N"
                            checked={formData.neutering === "N"}
                            onChange={handleChange}
                            required
                        />
                        N
                    </label>
                </div>

                {/* 생년월일 */}
                <div>
                    <input type="text" className="input-puppy" name="puppy_birth" value={formData.puppy_birth} onChange={handleChange} placeholder="생년월일 (2000.01.01)" required />
                </div>

                {/* 종 */}
                <div>
                    <input type="text" className="input-puppy" name="breed" value={formData.breed} onChange={handleChange} placeholder="종" required/>
                </div>

                {/* 알러지 유무 */}
                <div>
                    <input type="text" className="input-puppy" name="allergy" value={formData.allergy} onChange={handleChange} placeholder="알러지 유무(유일 경우 자세히 서술해주세요.)" required />
                </div>

                {/* 성격 */}
                <div>
                    <input type="text" className="input-puppy" name="personality" value={formData.personality} onChange={handleChange} placeholder="성격 또는 특징" required />
                </div>

                {/* 자기소개 */}
                <div>
                    <input type="text" className="input-introduction" name="introduction" value={formData.introduction} onChange={handleChange} placeholder="자기소개" required />
                </div>

                <div>
                    <button type="submit" id="registerPuppyBut">수정하기&nbsp;🐶</button>
                </div>
            </form>
        </div>
    );
}

export default EditPuppy;
