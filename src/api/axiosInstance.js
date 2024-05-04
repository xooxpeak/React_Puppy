import { useCookies } from 'react-cookie';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

// useAxiosWithAuth 함수 정의
const AxiosInstance = () => {
  const [cookies] = useCookies(['accessToken']);  // useCookies 훅을 사용하여 쿠키 상태를 가져옴
  const accessToken = cookies.accessToken;  // 쿠키에서 accessToken 가져옴
  const navigate = useNavigate();
  
  // axios 인스턴스 생성
  const axiosInstance = axios.create({
    baseURL: 'http://172.30.1.74:3000/',  // 기본 URL
    timeout: 1000,  // 타임아웃
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    // 요청 전에 실행될 함수 정의
    (config) => {
 //     const token = cookies.accessToken;  // 쿠키에서 accessToken 가져옴
      if (accessToken) {  // accessToken이 존재하는 경우
        config.headers.Authorization = `Bearer ${accessToken}`;  // 요청 헤더에 Authorization 속성을 추가하여 토큰을 포함
      }
      return config;  // 변경된 설정(config)을 반환
    },
    // 요청에 대한 오류 처리 함수를 정의
    (error) => {
      console.error(error);
      return Promise.reject(error);  // 오류를 반환하여 프로미스 체인을 중단
    }
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    // 성공적인 응답 => 응답을 그대로 반환함
    (response) => response,
    // 요청에 대한 오류 처리 함수를 정의
    (error) => {
      const statusCode = error.response?.status;  // 오류 응답의 상태 코드 가져오기
      if (statusCode === 401) {  // 상태 코드가 401인 경우
        error.response.statusText = 'Unauthorized';  // 응답의 텍스트 상태를 'Unauthorized'로 설정
        error.response.status = 401;   // 응답의 상태 코드를 401로 설정
        navigate('/');  // 메인페이지로 이동
      }
      return Promise.reject(error);  // 오류를 반환하여 프로미스 체인을 중단
    }
  );

  return axiosInstance;
};

export default AxiosInstance;
