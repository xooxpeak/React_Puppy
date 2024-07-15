import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AxiosInstance = () => {
    const [cookies, setCookies, removeCookies] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);  // 현재 토큰 갱신 요청이 진행 중인지 여부
    const [refreshSubscribers, setRefreshSubscribers] = useState([]);  // 토큰 갱신이 완료된 후 다시 시도해야 할 요청들을 저장

    useEffect(() => {
        console.log('AxiosInstance - 쿠키에서 읽은 accessToken:', cookies.accessToken);
    }, [cookies]);

    // Axios 인스턴스를 생성
    const axiosInstance = axios.create({
        headers: { "Content-Type": "application/json" },  // 기본 헤더 설정
        baseURL: 'http://localhost:8082/',  // 기본 URL 설정
        withCredentials: true  // 크로스 도메인 요청에 쿠키를 포함
    });

    // 토큰 갱신을 기다리는 요청을 구독하는 함수
    // 콜백을 refreshSubscribers 배열에 추가
    const subscribeTokenRefresh = (cb) => {
        setRefreshSubscribers((prevSubscribers) => [...prevSubscribers, cb]);
    };

    // 토큰 갱신이 완료되었을 때 호출되는 함수
    // 구독된 모든 요청에 새로운 토큰을 전달
    const onRefreshed = (newAccessToken) => {
        refreshSubscribers.forEach((cb) => cb(newAccessToken));
        setRefreshSubscribers([]);  // refreshSubscribers 배열을 초기화
    };

    // 액세스 토큰을 갱신하는 비동기 함수
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:8082/api/v1/auth/n/refreshToken', {
                accessToken: cookies.accessToken
            }, {
                withCredentials: true,
            });

            const newAccessToken = response.data.accessToken;  // 새로운 accessToken을 응답에서 가져옴
            setCookies('accessToken', newAccessToken, { path: '/' });  // 새로운 accessToken을 쿠키에 저장
            return newAccessToken;  // 새로운 accessToken을 반환
        } catch (error) {
            removeCookies('accessToken', { path: '/' });  // 실패 시 accessToken 쿠키를 제거
            navigate('/login');  // 로그인 페이지로 이동
            throw error;
        }
    };

    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
        (config) => {
            if (!config.url.includes('/api/v1/auth/n/login') && cookies.accessToken) {
                config.headers.Authorization = `Bearer ${cookies.accessToken}`;  // 요청 헤더에 Authorization 속성을 추가하여 토큰을 포함
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터 설정
    axiosInstance.interceptors.response.use(
        // 응답이 정상일 경우 그대로 반환
        (response) => response,

        // 응답에서 오류가 발생한 경우 실행되는 함수
        async (error) => {
            const statusCode = error.response?.status;  // 오류 응답의 상태 코드를 가져옴
            const originalRequest = error.config;  // 원래 요청을 저장

            if (statusCode === 401 && !originalRequest._retry) {  // 상태 코드가 401이고 원래 요청이 재시도되지 않은 경우
                if (isRefreshing) {  // 현재 토큰 갱신 요청이 진행 중인 경우
                    return new Promise((resolve) => {  // 새로운 Promise를 반환
                        subscribeTokenRefresh((newAccessToken) => {  // 토큰 갱신을 구독
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;  // 새로운 토큰을 원래 요청에 설정
                            resolve(axiosInstance(originalRequest));  // 원래 요청을 다시 시도
                        });
                    });
                }

                originalRequest._retry = true;  // 원래 요청을 재시도하도록 설정
                setIsRefreshing(true);  // 토큰 갱신 상태를 true로 설정

                try {
                    const newAccessToken = await refreshAccessToken();  // 토큰 갱신을 시도
                    onRefreshed(newAccessToken);  // 토큰 갱신 완료 후 구독된 요청들에 알림
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;  // 새로운 토큰을 원래 요청에 설정
                    return axiosInstance(originalRequest);  // 원래 요청을 다시 시도
                } catch (refreshError) {
                    return Promise.reject(refreshError);  // 토큰 갱신에 실패한 경우 오류를 반환
                } finally {
                    setIsRefreshing(false);  // 토큰 갱신 상태를 false로 설정
                }
            }

            return Promise.reject(error); 
        }
    );

    return axiosInstance;  
};

export default AxiosInstance;
