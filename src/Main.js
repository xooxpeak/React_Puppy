import React from "react";
import Nav2 from "./components/Nav2";
import { Link } from "react-router-dom";
import './css/Main.css';
import DogsImage from './image/Main2.png';

let Main = () => {
    return (
        <div className="main-container">
            <Nav2 />
            <div className="hero-section">
                <h1>댕 린 이 집</h1>
                <p>Better Care, Better Life</p>
                <Link to="/register" className="main-button">이용하기</Link>
            </div>
            
            <div className="image-section">
                <img src={DogsImage} alt="Group of dogs" className="dogs-image" />
            </div>

            <div className="button-section">
                <Link to="/noteList" className="square-button">알림장</Link>
                <Link to="/gallery" className="square-button">사진첩</Link>
                <Link to="/board" className="square-button">게시판</Link>
            </div>
            
            <div className="info-section">
                <div className="info-card">
                    <i className="fas fa-paw card-icon"></i>
                    <h2>Our Services</h2>
                    <p>We provide the best care for your pets, with professional trainers and a loving environment.</p>
                </div>
                <div className="info-card">
                    <i className="fas fa-heart card-icon"></i>
                    <h2>Why Choose Us?</h2>
                    <p>We ensure the safety, happiness, and well-being of your furry friends while you are away.</p>
                </div>
                <div className="info-card">
                    <i className="fas fa-phone-alt card-icon"></i>
                    <h2>Contact Us</h2>
                    <p>Reach out to us for more information or to schedule a visit.</p>
                </div>
            </div>
        </div>
    );
};

export default Main;
