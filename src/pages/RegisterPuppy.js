import React from "react";
import '../css/RegisterPuppy.css';
import Nav from "../components/Nav";
import { useState } from "react";
import axios from "axios";

// useState 훅을 사용하여 객체 형태의 puppy 상태 선언
let RegisterPuppy = () => {
    let [puppy,setPuppy] = useState({
        puppyName : "",
        gender : "",
        neutering : "",
        puppyBirth : "",
        breed : "",
        allergy : "",
        personality : "",
        introduction : "",
        profileImg : ""
    });

    // axios를 사용하여 HTTP POST 요청을 보냄
    let register = () => {
        axios.post('http://localhost:8082/api/v1/auth/y/puppy', {
            params:{
                puppyName: puppy.puppyName,
                gender: puppy.gender,
                neutering: puppy.neutering,
                puppyBirth: puppy.puppyBirth,
                breed: puppy.breed,
                allergy: puppy.allergy,
                personality: puppy.personality,
                introduction: puppy.introduction,
                profileImg: puppy.profileImg
            }
        }).then((res) => {
            console.log(res);
        });
    }

    // useState 훅으로 관리되는 puppy 객체의 속성을 업데이트하는 함수
    let onChangePuppyData = (e) => {
        setPuppy({...puppy, [e.target.name] : e.target.value})
        console.log(puppy);
    }

    return (
        <div>
            <div>
                <Nav />
            </div>

            <form className="registerPuppyForm">
                <div>
                    <h1 id='registerPuppy_title'> 우리 아이 등록 </h1>
                </div>

                {/* 이름 */}
                <div>
                    <input type='text' className="input-puppy" name={"puppyName"} onChange={onChangePuppyData} placeholder='이름' autoFocus/>
                </div>

                {/* 성별 -> 추후 체크박스로 변경. */}
                <div>
                    <input type='text' className="input-puppy" name={"gender"} onChange={onChangePuppyData} placeholder="성별 남or여"/>
                </div>

                {/* 중성화 여부 -> 추후 체크박스로 변경. */}
                <div>
                    <input type='text' className="input-puppy" name={"neutering"} onChange={onChangePuppyData} placeholder="중성화여부"/>
                </div>

                {/* 생년월일 */}
                <div>
                    <input type='text' className="input-puppy" name={"puppyBirth"} onChange={onChangePuppyData} placeholder="생년월일 (2000.01.01)"/>
                </div>

                {/* 종 */}
                <div>
                    <input type='text' className="input-puppy" name={"breed"} onChange={onChangePuppyData} placeholder="종"/>
                </div>

                {/* 알러지 유무 -> 추후 체크박스로 변경. '유'일 경우 -> 새로운 인풋창 나오게.*/}
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