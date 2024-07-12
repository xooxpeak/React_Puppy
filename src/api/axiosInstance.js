import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosInstance = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AxiosInstance - 쿠키에서 읽은 accessToken:', cookies.accessToken);
    console.log('AxiosInstance - 쿠키에서 읽은 refreshToken:', cookies.refreshToken);
  }, [cookies]);

  // const ensureValidAccessToken = async () => {
  //   if (!cookies.accessToken) {
  //       throw new Error("No access token available");
  //   }

  //   const tokenPayload = JSON.parse(atob(cookies.accessToken.split('.')[1]));
  //   if (tokenPayload.exp * 1000 < Date.now()) {
  //     console.log('Sending refreshToken:', cookies.refreshToken);

  //     if (!cookies.refreshToken) {
  //       console.error('No refresh token available');
  //       throw new Error('No refresh token available');
  //     }

  //     const response = await axios.post('http://localhost:8082/api/v1/auth/n/refreshToken', {
  //       accessToken: cookies.accessToken,
  //       refreshToken: cookies.refreshToken
  //     });

  //     setCookies('accessToken', response.data.accessToken, { path: '/' });
  //     setCookies('refreshToken', response.data.refreshToken, { path: '/' });
  //     return response.data.accessToken;
  //   }
  //   return cookies.accessToken;
  // };

  // axios 인스턴스 생성
  const axiosInstance = axios.create({
    headers: { "Content-Type": "application/json" },
    baseURL: 'http://localhost:8082/',  // 기본 URL
    withCredentials: true
  });

  // // 요청 인터셉터
  // axiosInstance.interceptors.request.use(
  //   async (config) => {
  //     if (!config.url.includes('/api/v1/auth/n/login')) {  // 로그인 요청이 아닌 경우에만 토큰 검증
  //       try {
  //         const token = await ensureValidAccessToken();  // 유효한 access token을 보장
  //         console.log('Request token:', token);

  //         if (token) {
  //           config.headers.Authorization = `Bearer ${token}`;  // 요청 헤더에 Authorization 속성을 추가하여 토큰을 포함
  //         }
  //       } catch (error) {
  //         console.error('Error in request interceptor', error);
  //         throw error;  // 오류를 던져서 요청을 중단
  //       }
  //     }
  //     return config;  // 변경된 설정(config)을 반환
  //   },
  //   (error) => {
  //     console.error(error);
  //     return Promise.reject(error);  // 오류를 반환하여 프로미스 체인을 중단
  //   }
  // );

    // 요청 인터셉터
    axiosInstance.interceptors.request.use(
      async (config) => {
        if (!config.url.includes('/api/v1/auth/n/login')) {  // 로그인 요청이 아닌 경우에만 토큰 검증
          if (cookies.accessToken) {
            config.headers.Authorization = `Bearer ${cookies.accessToken}`;  // 요청 헤더에 Authorization 속성을 추가하여 토큰을 포함
          }
        }
        return config;  // 변경된 설정(config)을 반환
      },
      (error) => {
        console.error(error);
        return Promise.reject(error);  // 오류를 반환하여 프로미스 체인을 중단
      }
    );


  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const statusCode = error.response?.status;  // 오류 응답의 상태 코드 가져오기
      if (statusCode === 401) {  // 상태 코드가 401인 경우
        error.response.statusText = 'Unauthorized';  // 응답의 텍스트 상태를 'Unauthorized'로 설정
        error.response.status = 401;   // 응답의 상태 코드를 401로 설정
        try {
          const response = await axios.post('http://localhost:8082/api/v1/auth/n/refreshToken', {
            accessToken: cookies.accessToken,
            refreshToken: cookies.refreshToken
          }, {
            withCredentials: true,
          });

          const newAccessToken = response.data.accessToken;
          setCookies('accessToken', newAccessToken, { path: '/' }); // 새로운 액세스 토큰을 쿠키에 저장
          
          // 헤더에 새로운 액세스 토큰 설정
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(error.config); // 원래 요청 재시도
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          removeCookies('accessToken', { path: '/' });
          removeCookies('refreshToken', { path: '/' });
          navigate('/login'); // 로그인 페이지로 이동
        }
      }
      
      return Promise.reject(error);  // 오류를 반환하여 프로미스 체인을 중단
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
