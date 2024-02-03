import React from "react";
import '../css/Register.css';
import Nav from "../components/Nav";

class Register extends React.Component {
    render() {
        return (
        <div>
            <div>
                <Nav/>
            </div>
          <form>
            <div>
            <h1 id='register_title'> 회원가입</h1>
            </div>
            <div className='register'>
            <div>
                {/* 아이디 */}
                <div>
                <h5> 아이디 </h5>
                <input type='text' class="input-field" maxLength='20' name='register_id' placeholder="7자 이상의 문자" autoFocus/>
                <button type="button" id="dupIdCheck">중복확인</button>
                </div>

                {/* 비밀번호 */}
                <div>
                <h5> 비밀번호 </h5>
                <input type='password' class="input-field" maxLength='15' name='register_password' placeholder="비밀번호"/>
                </div>

                {/* 비밀번호 */}
                <div>
                <h5> 비밀번호 확인 </h5>
                <input type='password' class="input-field" maxLength='15' name='register_pswCheck' placeholder="비밀번호 확인"/>
                </div>
            
                {/* 이름 */}
                <div>
                <h5> 이름 </h5>
                <input type='text' class="input-field" maxLength='10' name='register_name' placeholder="이름"/>
                </div>

                {/* 생년월일 */}
                <div>
                <h5> 생년월일 </h5>
                <input type='text' class="input-field2" maxLength='6' name='register_birthday'/> -&nbsp; 
                <input type='text' class="input-field3" maxLength='1' name='register_sex'/> ******
                </div>

                {/* 이메일 */}
                <div>
                <h5> 이메일 </h5>
                <input type='text' class="input-field2" maxLength='15' name='register_email'/> @&nbsp; 
                <select name='register_email_select'>
                    <option value='gmail.com'> gmail.com </option>
                    <option value='naver.com'> naver.com </option>
                    <option value='write'> 직접 입력 </option>
                </select>
                </div>

                {/* 주소 추가해야됨 */}
              </div>
            </div>

            <div>
            <button type="submit" id="sbtn">가입하기&nbsp;🎉</button>
            </div>
        </form>
      </div>

        )
    }
}

export default Register;