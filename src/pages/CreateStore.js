import React from "react";
import '../css/CreateStore.css';
import Nav2 from "../components/Nav2";
import { useState } from "react";
import axios from "axios";

// useState 훅을 사용하여 객체 형태의 store 상태 선언
let CreateStore = () => {
    let [store,setStore] = useState({
        storeName : "",
        managerName : "",
        storePhone : "",
        storeAddr1 : "",
        storeAddr2 : "",
    });

    // axios를 사용하여 HTTP POST 요청을 보냄
    let createStore = () => {
        axios.post('http://localhost:8082/api/v1/auth/y/store', {
            params:{
                storeName : store.storeName,
                managerName : store.managerName,
                storePhone : store.storePhone,
                storeAddr1 : store.storeAddr1,
                storeAddr2 : store.storeAddr2
            }
        }).then((res) => {
            console.log(res);
        });
    }

    // useState 훅으로 관리되는 store 객체의 속성을 업데이트하는 함수
    let onChangeStoreData = (e) => {
        setStore({...store, [e.target.name] : e.target.value})
        console.log(store);
    }

    return (
        <div>
            <div>
                <Nav2 />
            </div>

            <form className="CreateStoreForm">
                <div>
                    <h2 id='createStore_title'> 유치원 신청 </h2>
                </div>

                {/* 유치원 이름 */}
                <div>
                    <input type='text' className="input-store" name={"storeName"} onChange={onChangeStoreData} placeholder='유치원 이름' autoFocus/>
                </div>

                {/* 관리자 이름 */}
                <div>
                    <input type='text' className="input-store" name={"managerName"} onChange={onChangeStoreData} placeholder="관리자 이름"/>
                </div>

                {/* 유치원 전화번호 */}
                <div>
                    <input type='text' className="input-store" name={"storePhone"} onChange={onChangeStoreData} placeholder="유치원 전화번호"/>
                </div>

                {/* 주소1 */}
                <div>
                    <input type='text' className="input-store" name={"storeAddr1"} onChange={onChangeStoreData} placeholder="주소"/>
                </div>

                {/* 주소2 (상세주소) */}
                <div>
                    <input type='text' className="input-store" name={"storeAddr2"} onChange={onChangeStoreData} placeholder="상세주소"/>
                </div>

                <div>
                    <button type="submit" id="createStoreBut" onClick={createStore}>신청하기&nbsp;</button>
                </div>
            </form>
        </div>
    );
}

export default CreateStore;


