import React from "react";
import '../css/Register.css';
import Nav from "../components/Nav";
import { useState } from "react";
import axios from "axios";

let Register = () => {
    let [user,setUser] = useState({
        userId : "",
        password : "",
        name : "",
        birth : "",
        email : "",
        phone : "",
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

    let dupIdCheck = () => {
        axios.post('http://localhost:8082/api/v1/auth/n/dupIdCheck', {
            params:{
                userId: user.userId
            }
        }).then((res) => {
            console.log(res);
        });
    }

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
                        <input type='text' className="input-field" name={"userId"} onChange={onChangeUserData} maxLength='20' placeholder="7자 이상의 문자" autoFocus/>
                        <button type="button" id="dupIdCheck" onClick={dupIdCheck}>중복확인</button>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <h5> 비밀번호 </h5>
                        <input type='password' className="input-field" name={"password"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호"/>
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <h5> 비밀번호 확인 </h5>
                        <input type='password' className="input-field" name={"password"} onChange={onChangeUserData} maxLength='15' placeholder="비밀번호 확인"/>
                    </div>
                
                    {/* 이름 */}
                    <div>
                        <h5> 이름 </h5>
                        <input type='text' className="input-field" name={"name"} onChange={onChangeUserData} maxLength='10' placeholder="이름"/>
                    </div>

                    {/* 생년월일 */}
                    <div>
                        <h5> 생년월일 </h5>
                        <input type='text' className="input-field2" name={"birth"} onChange={onChangeUserData} maxLength='6'/> -&nbsp; 
                        <input type='text' className="input-field3" maxLength='1' name='register_sex'/> ******
                    </div>

                    {/* 이메일 */}
                    <div>
                        <h5> 이메일 </h5>
                        <input type='text' className="input-field2" name={"email"} onChange={onChangeUserData} maxLength='15'/> @&nbsp; 
                        <select name='register_email_select'>
                            <option value='gmail.com'> gmail.com </option>
                            <option value='naver.com'> naver.com </option>
                            <option value='write'> 직접 입력 </option>
                        </select>

                        {/* {this.state.email_writer ? <div> <input type='text' name='register_email_write' maxLength='20'/> </div>
                                                 : null} */}
                    </div>

                    {/* 주소 추가해야됨 */}
                </div>
            </div>

            <div>
            <button type="submit" id="sbtn">가입하기&nbsp;🎉</button>
            </div>
        </form>
      </div>

    );
}

export default Register;