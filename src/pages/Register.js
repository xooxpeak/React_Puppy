import React from "react";
import '../css/Register.css';
import Nav2 from "../components/Nav2";
import { useState } from "react";
import axios from "axios";

// useState 훅을 사용하여 객체 형태의 user 상태 선언
let Register = () => {
    let [user,setUser] = useState({
        userId : "",
        password : "",
        name : "",
        birth : "",
        email : "",
        addr1 : "",
        addr2 : ""
    });
    // email_writer의 state값을 false로 생성
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         email_writer : false,
    //     }
    // }

    // changeEmailSelect 함수
    // let changeEmailSelect = (event) => {
    //     const select = event.target.value;

    //     if (select === 'write') {
    //         this.setState({ email_writer: true }, () => {
    //             console.log("email_writer is now true:", this.state.email_writer);
    //         });
    //     } else {
    //         this.setState({ email_writer: false }, () => {
    //             console.log("email_writer is now false:", this.state.email_writer);
    //         });
    //     }
    // }

    // 사용자가 입력한 아이디가 중복되는지 확인하기 위해 서버로 요청을 보내는 함수
    // axios를 사용하여 HTTP POST 요청을 보내고
    // 서버의 응답을 콘솔에 출력
    let dupIdCheck = () => {
        // 입력란이 비어있을 경우의 경고창
        if(user.userId !="") {
            axios.post(`http://localhost:8082/api/v1/auth/n/dupIdCheck?userId=${user.userId}`, {}).then((res) => {
                // 중복인 경우 (true)
                console.log(res.data);
                if (res.data) {
                    console.log("이미 사용 중인 아이디입니다.")
                    //document.getElementById("userId").focus();
                } else {
                    console.log("사용 가능한 아이디입니다.");
                }
            });
        }
    }

    // useState 훅을 사용하여 유효성 검사를 위해 추가
    let [resUserData,setResUserData] = useState([]);

    // 회원가입
    let register = () => {
        // 입력란이 비어있을 경우의 경고창
        // if(!user.userId || !user.password || !user.name || !user.password2 || !user.birth || !user.email){
        //     alert("모든 항목을 다 작성해주세요.");
        //     return;  // 함수 실행을 중단하고 반환
        // }
        axios({
            url:'http://localhost:8082/api/v1/auth/n/register',
            method: 'POST',
            data: user
        })
        .then((res) => {
        // 회원가입 성공
            // 유효성 검사 실패 시
            if(res.data.code == 402){
                setResUserData(res.data.data);
            }

            // 패스워드 불일치 시
            if(res.data.code == 401){
                alert("패스워드가 불일치합니다.")
            }

            console.log("Response:", res.data);
            
            // 회원가입 성공
            if(res.data.code == 200){
                alert("회원가입이 완료되었습니다!");
            }
        })
        .catch((error) => {
            // 회원가입 실패
            alert("서버 오류");
            console.log("Error:", error);
        });
    }

    // useState 훅으로 관리되는 user 객체의 속성을 업데이트하는 함수
    let onChangeUserData = (e) => {
        if(e.target.name == "userId"){
            dupIdCheck();
        }
        setUser({...user, [e.target.name] : e.target.value})
        console.log(user);
    }

    return (
        <div>
            <div>
                <Nav2/>
            </div>
          <form className="registerForm">
            <div>
                <h1 id='register_title'> 회원가입</h1>
            </div>
            <div className='register'>
                <div>
                    {/* 아이디 */}
                    <div className="register1">
                        <h5> 아이디 </h5>
                        <input type='text' className="input-field" name={"userId"} onChange={onChangeUserData} maxLength='20' placeholder="7자 이상의 문자의 아이디를 입력해주세요." autoFocus/>
                        {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "userId" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "userId" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>

                    {/* 비밀번호 */}
                    <div className="register1">
                        <h5> 비밀번호 </h5>
                        <input type='password' className="input-field" name={"password"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호를 입력해주세요."/>
                        {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "password" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "password" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="register1">
                        <h5> 비밀번호 확인 </h5>
                        <input type='password' className="input-field" name={"password2"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."/>
                        {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "password2" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "password2" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>
                
                    {/* 이름 */}
                    <div className="register1">
                        <h5> 이름 </h5>
                        <input type='text' className="input-field" name={"name"} onChange={onChangeUserData} maxLength='10' placeholder="이름을 입력해주세요."/>
                        {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "name" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "name" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>

                    {/* 생년월일 */}
                    <div className="register1">
                        <h5> 생년월일 </h5>
                        <input type='text' className="input-field2" name={"birth"} onChange={onChangeUserData} maxLength='8'placeholder="(20000101)"/> {/* -&nbsp; 
                        <input type='text' className="input-field3" maxLength='1' name='birth2'/> ******  */}
                         {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "birth" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "birth" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>

                    {/* 이메일 */}
                    <div className="register1">
                        <h5> 이메일 </h5>
                        <input type='text' className="input-field2" name={"email"} onChange={onChangeUserData} maxLength='15'placeholder="이메일 아이디"/> {/*@&nbsp;*/} 
                       {/* <select name='register_email_select'>
                            <option value='gmail.com'> gmail.com </option>
                            <option value='naver.com'> naver.com </option>
                            <option value='write'> 직접 입력 </option>
    </select> */}

                        {/* {this.state.email_writer ? <div> <input type='text' name='register_email_write' maxLength='20'/> </div>
                                                 : null} */}

                        {/* {
                            resUserData.map((data)=>(
                                <>
                                {
                                    "email" === data.field ? (
                                        <div style={{
                                            color:"red"
                                        }}>{data.defaultMessage}</div>
                                    ):(<></>)
                                }
                                </>
                            ))
                        } */}
                        {
                                resUserData.map((data) => (
                                    <div className="error-message">
                                        {data.field === "email" && data.defaultMessage}
                                    </div>
                                ))
                        }
                    </div>

                    {/* 주소 추가해야됨 */}
                </div>
            </div>

            <div>
                <button type="button" id="sbtn" onClick={register}>가입하기&nbsp;🎉</button>
            </div>
        </form>
      </div>

    );
}

export default Register;