import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './api/AxiosInstance';

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const navigate = useNavigate();
  const axios = AxiosInstance(navigate);
  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);
