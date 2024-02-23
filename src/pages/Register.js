import React from "react";
import '../css/Register.css';
import Nav from "../components/Nav";
import { useState } from "react";
import axios from "axios";

// useState 훅을 사용하여 객체 형태의 user 상태 선언
let Register = () => {
    let [user,setUser] = useState({
        userId : "",
        password : "",
 //       password2 : "",
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
        if(!user.userId){
            alert("아이디를 입력해주세요.");
            return;  // 함수 실행을 중단하고 반환
        }
        axios.post(`http://localhost:8082/api/v1/auth/n/dupIdCheck?userId=${user.userId}`, {
        }).then((res) => {
            // 중복인 경우 (true)
            if(res.data) {
                alert("이미 사용 중인 아이디입니다.");
                document.getElementById("userId").focus();
            } else {
                alert("사용 가능한 아이디입니다.");
            }
            console.log(res.data);
        });
    }

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
            alert("회원가입이 완료되었습니다!");
            console.log("Response:", res.data);
        })
        .catch((error) => {
            // 회원가입 실패
            alert("회원가입에 실패했습니다. 다시 확인해주세요.");
            console.log("Error:", error);
        });
    }

    // useState 훅으로 관리되는 user 객체의 속성을 업데이트하는 함수
    let onChangeUserData = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
        console.log(user);
    }

    return (
        <div>
            <div>
                <Nav/>
            </div>
          <form className="registerForm">
            <div>
                <h1 id='register_title'> 회원가입</h1>
            </div>
            <div className='register'>
                <div>
                    {/* 아이디 */}
                    <div>
                        <h5> 아이디 </h5>
                        <input type='text' className="input-field" name={"userId"} onChange={onChangeUserData} maxLength='20' placeholder="7자 이상의 문자의 아이디를 입력해주세요." autoFocus/>
                        <button type="button" id="dupIdCheck" onClick={dupIdCheck}>중복확인</button>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <h5> 비밀번호 </h5>
                        <input type='password' className="input-field" name={"password"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호를 입력해주세요."/>
                    </div>

                    {/* 비밀번호 확인
                    <div>
                        <h5> 비밀번호 확인 </h5>
                        <input type='password' className="input-field" name={"password2"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."/>
                    </div> */}
                
                    {/* 이름 */}
                    <div>
                        <h5> 이름 </h5>
                        <input type='text' className="input-field" name={"name"} onChange={onChangeUserData} maxLength='10' placeholder="이름을 입력해주세요."/>
                    </div>

                    {/* 생년월일 */}
                    <div>
                        <h5> 생년월일 </h5>
                        <input type='text' className="input-field2" name={"birth"} onChange={onChangeUserData} maxLength='6'placeholder="(20000101)"/> {/* -&nbsp; 
                        <input type='text' className="input-field3" maxLength='1' name='birth2'/> ******  */}
                    </div>

                    {/* 이메일 */}
                    <div>
                        <h5> 이메일 </h5>
                        <input type='text' className="input-field2" name={"email"} onChange={onChangeUserData} maxLength='15'placeholder="이메일 아이디"/> @&nbsp; 
                       {/* <select name='register_email_select'>
                            <option value='gmail.com'> gmail.com </option>
                            <option value='naver.com'> naver.com </option>
                            <option value='write'> 직접 입력 </option>
    </select> */}

                        {/* {this.state.email_writer ? <div> <input type='text' name='register_email_write' maxLength='20'/> </div>
                                                 : null} */}
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