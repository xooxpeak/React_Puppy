import React from "react";
import '../css/RegisterPuppy.css';
import Nav2 from "../components/Nav2";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

// useState 훅을 사용하여 객체 형태의 puppy 상태 선언
let RegisterPuppy = () => {

    let [cookies] = useCookies(['accessToken']);

    let [puppy,setPuppy] = useState({
        puppy_name : "",
        gender : "",
        neutering : "",
        puppy_birth : "",
        breed : "",
        allergy : "",
        personality : "",
        introduction : "",
        profile_img : ""
    });

    // axios를 사용하여 HTTP POST 요청을 보냄
    let register = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/api/v1/auth/y/savePuppy', 
            {
                puppy_name: puppy.puppy_name,
                gender: puppy.gender,
                neutering: puppy.neutering,
                puppy_birth: puppy.puppy_birth,
                breed: puppy.breed,
                allergy: puppy.allergy,
                personality: puppy.personality,
                introduction: puppy.introduction,
                profile_img: puppy.profile_img
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + cookies.accessToken,
                }
            }
        ).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        })

    };

    // useState 훅으로 관리되는 puppy 객체의 속성을 업데이트하는 함수
    let onChangePuppyData = (e) => {
        let { name, value } = e.target;
         setPuppy({ ...puppy, [name]: value });
        // if (name === "neutering") {
        //     setPuppy({ ...puppy, [name]: value === "true" });
        // } else {
        //     setPuppy({ ...puppy, [name]: value });
        // }
    }

    return (
        <div>
            <div>
                <Nav2 />
            </div>
            <div>
                <h3 style={{textAlign: 'center', marginTop: '20px'}}><strong>강아지 등록🐾</strong></h3>
            </div>
            <form className="registerPuppyForm">
                {/* 이름 */}
                <div>
                    <input type='text' className="input-puppy" name={"puppy_name"} onChange={onChangePuppyData} placeholder='이름' autoFocus/>
                </div>

                {/* 성별 */}
                <div className="neutering-container">
                    <span className="neutering">성별</span>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            checked={puppy.gender === "M"}
                            onChange={onChangePuppyData}
                        />
                        남
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={puppy.gender === "F"}
                            onChange={onChangePuppyData}
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
                            checked={puppy.neutering === "Y"}
                            onChange={onChangePuppyData}
                        />
                        Y
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="neutering"
                            value="F"
                            checked={puppy.neutering === "F"}
                            onChange={onChangePuppyData}
                        />
                        N
                    </label>
                </div>

                {/* 생년월일 */}
                <div>
                    <input type='text' className="input-puppy" name={"puppy_birth"} onChange={onChangePuppyData} placeholder="생년월일 (2000.01.01)"/>
                </div>

                {/* 종 */}
                <div>
                    <input type='text' className="input-puppy" name={"breed"} onChange={onChangePuppyData} placeholder="종"/>
                </div>

                {/* 알러지 유무 -> 추후 라디오버튼으로 변경. '유'일 경우 -> 새로운 인풋창 나오게.*/}
                <div>
                    <input type='text' className="input-puppy" name={"allergy"} onChange={onChangePuppyData} placeholder="알러지 유무(유일 경우 자세히 서술해주세요.)"/>
                </div>

                {/* 성격 */}
                <div>
                    <input type='text' className="input-puppy" name={"personality"} onChange={onChangePuppyData} placeholder="성격 또는 특징"/>
                </div>

                {/* 자기소개 */}
                <div>
                    <input type='text' className="input-introduction" name={"introduction"} onChange={onChangePuppyData} placeholder="자기소개"/>
                </div>

                <div>
                    <button type="submit" id="registerPuppyBut" onClick={register}>등록하기&nbsp;🐶</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPuppy;