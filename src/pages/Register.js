import React, { useState } from "react";
import '../css/Register.css';
import Nav2 from "../components/Nav2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

let Register = () => {
    let navigate = useNavigate();

    let [user, setUser] = useState({
        user_Id: "",
        password: "",
        password2: "",
        name: "",
        birth: "",
        email: "",
        addr1: "",
        addr2: ""
    });

    let [validationMessages, setValidationMessages] = useState({
        user_Id: "",
        password: "",
        password2: "",
        name: "",
        birth: "",
        email: ""
    });

    let dupIdCheck = async (userId) => {
        if (userId !== "") {
            try {
                let res = await axios.post(`http://localhost:8082/api/v1/auth/n/dupIdCheck?userId=${userId}`);
                if (res.data) {
                    setValidationMessages(prev => ({ ...prev, user_Id: "🔺이미 사용 중인 아이디입니다." }));
                } else {
                    setValidationMessages(prev => ({ ...prev, user_Id: "사용 가능한 아이디입니다." }));
                }
            } catch (error) {
                console.error("Error checking duplicate ID:", error);
            }
        }
    };

    let validate = (name, value) => {
        let message = "";
        switch (name) {
            case "user_Id":
                if (value.length < 7) { 
                    message = "🔺아이디는 7자 이상이어야 합니다.";
                } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value)) {
                    message = "🔺아이디는 문자와 숫자를 모두 포함해야 합니다.";
                }
                break;
            case "password":
                if (value.length < 6) {
                message = "🔺비밀번호는 6자 이상이어야 합니다."; 
                } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value)) {
                    message = "🔺비밀번호는 문자와 숫자를 모두 포함해야 합니다.";
                }
                break;
            case "password2":
                if (value !== user.password) message = "🔺비밀번호가 일치하지 않습니다.";
                break;
            case "name":
                if (!value) message = "🔺이름을 입력해주세요.";
                break;
            case "birth":
                if (!/^\d{8}$/.test(value)) message = "🔺생년월일은 8자리 숫자여야 합니다. (예: 20000101)";
                break;
            case "email":
                if (!/^[^\s@]+@(naver\.com|google\.com|daum\.net)$/.test(value)) message = "🔺유효한 이메일 주소를 입력해주세요.";
                break;
            default:
                break;
        }
        setValidationMessages(prev => ({ ...prev, [name]: message }));
    };

    let onChangeUserData = async (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (name === "user_Id") {
            await dupIdCheck(value);
        } else {
            validate(name, value);
        }
    };

    let register = async () => {
        try {
            let res = await axios.post('http://localhost:8082/api/v1/auth/n/register', user);
            // setValidationMessages(res.data.data || []);
            console.log(res.data); // 서버 응답 확인

            if (res.data.code == 402) {
                // 필수항목 미기입
                setValidationMessages(res.data.data);
                alert("입력 항목들을 다시 확인해주세요.");
            } else if (res.data.code == 400) {
                alert("중복된 아이디 입니다. 다른 아이디를 사용해주세요.")
            } else if (res.data.code == 401) {
                // 패스워드 불일치
                alert("패스워드가 일치하지 않습니다.");
            } else if (res.data.code == 200) {
                // 회원가입 성공
                alert("회원가입이 완료되었습니다!");
                // 회원가입 성공 시 로그인 페이지로 이동
                navigate('/registerPuppy');
            } else {
                    // 예기치 않은 코드 처리
                    alert("알 수 없는 응답 코드: " + res.data.code);
            }
        } catch (error) {
            alert("서버 오류");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Nav2 />
            <form className="registerForm">
                <div>
                    <h1 id='register_title'>회원가입</h1>
                </div>
                <div className='register'>
                    <div>
                        <div className="register1">
                            <h5>아이디</h5>
                            <input
                                type='text'
                                className="input-field"
                                name="user_Id"
                                onChange={onChangeUserData}
                                maxLength='20'
                                placeholder="7자 이상의 문자의 아이디를 입력해주세요."
                                autoFocus
                            />
                            <div className="error-message">{validationMessages.user_Id}</div>
                        </div>

                        <div className="register1">
                            <h5>비밀번호</h5>
                            <input
                                type='password'
                                className="input-field"
                                name="password"
                                onChange={onChangeUserData}
                                maxLength='15'
                                placeholder="비밀번호를 입력해주세요."
                            />
                            <div className="error-message">{validationMessages.password}</div>
                        </div>

                        <div className="register1">
                            <h5>비밀번호 확인</h5>
                            <input
                                type='password'
                                className="input-field"
                                name="password2"
                                onChange={onChangeUserData}
                                maxLength='15'
                                placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."
                            />
                            <div className="error-message">{validationMessages.password2}</div>
                        </div>

                        <div className="register1">
                            <h5>이름</h5>
                            <input
                                type='text'
                                className="input-field"
                                name="name"
                                onChange={onChangeUserData}
                                maxLength='10'
                                placeholder="이름을 입력해주세요."
                            />
                            <div className="error-message">{validationMessages.name}</div>
                        </div>

                        <div className="register1">
                            <h5>생년월일</h5>
                            <input
                                type='text'
                                className="input-field2"
                                name="birth"
                                onChange={onChangeUserData}
                                maxLength='8'
                                placeholder="(20000101)"
                            />
                            <div className="error-message">{validationMessages.birth}</div>
                        </div>

                        <div className="register1">
                            <h5>이메일</h5>
                            <input
                                type='text'
                                className="input-field2"
                                name="email"
                                onChange={onChangeUserData}
                                maxLength='50'
                                placeholder="이메일 아이디"
                            />
                            <div className="error-message">{validationMessages.email}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="sbtn" onClick={register}>
                        가입하기&nbsp;🎉
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
