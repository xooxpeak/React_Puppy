import React from "react";
import '../css/CreateStore.css';
import Nav2 from "../components/Nav2";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let CreateStore = () => {

    let [cookies] = useCookies(['accessToken']);
    let navigate = useNavigate();

    let [store, setStore] = useState({
        storeName: "",
        managerName: "",
        storePhone: "",
        storeAddr1: "",
        storeAddr2: "",
    });

    let createStore = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8082/api/v1/auth/y/saveStore', {
            storeName: store.storeName,
            managerName: store.managerName,
            storePhone: store.storePhone, 
            storeAddr1: store.storeAddr1,
            storeAddr2: store.storeAddr2
        },            
        {
            headers: {
                'Authorization': 'Bearer ' + cookies.accessToken,
                'Content-Type': 'application/json' // Ensure JSON content type
            }
        }).then((res) => {
            alert("유치원 등록 성공!");
            console.log(res);
            navigate('/');
        }).catch((error) => {
            console.error(error);
        });
    }

    let onChangeStoreData = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }

    return (
        <div>
            <div>
                <Nav2 />
            </div>
            <div>
                <h3 style={{ textAlign: 'center', marginTop: '20px' }}><strong>유치원 등록</strong></h3>
            </div>
            <form className="CreateStoreForm" onSubmit={createStore}>
                <div>
                    <input type='text' className="input-store" name="storeName" onChange={onChangeStoreData} placeholder='유치원 이름' autoFocus />
                </div>

                <div>
                    <input type='text' className="input-store" name="managerName" onChange={onChangeStoreData} placeholder="관리자 이름" />
                </div>

                <div>
                    <input type='text' className="input-store" name="storePhone" onChange={onChangeStoreData} placeholder="유치원 전화번호" />
                </div>

                <div>
                    <input type='text' className="input-store" name="storeAddr1" onChange={onChangeStoreData} placeholder="주소" />
                </div>

                <div>
                    <input type='text' className="input-store" name="storeAddr2" onChange={onChangeStoreData} placeholder="상세주소" />
                </div>

                <div>
                    <button type="submit" id="createStoreBut">신청하기&nbsp;</button>
                </div>
            </form>
        </div>
    );
}

export default CreateStore;
