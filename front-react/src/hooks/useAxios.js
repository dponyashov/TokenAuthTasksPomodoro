import { useEffect } from 'react';
import api from '../api/AxiosAuthApi';
import { useAuth } from './useAuth';

export const useAxios = () => {
  // Предположим, ваш контекст возвращает текущий токен и функцию для его обновления
  const { auth, refresh, logout } = useAuth();

  useEffect(() => {
    // 1. Перехватчик ЗАПРОСОВ: Добавляет актуальный токен из контекста
    const requestIntercept = api.interceptors.request.use(
      (config) => {

        console.log(`config?._retry = ${config?._retry}`)

        if (!config.headers['Authorization'] && auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Перехватчик ОТВЕТОВ: Обрабатывает ошибку 401
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        console.log(`prevRequest?._retry = ${prevRequest?._retry}`);

        // Проверяем, что ошибка 401 и этот запрос еще НЕ пытались повторить (_retry)
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;          

          try {
            // Отправляем запрос на обновление токена. 
            // Сервер сам прочитает refresh-токен из httpOnly cookie.
            // const response = await axios.post(
            //   'http://localhost:8080/api/auth/refresh',
            //   {},
            //   { withCredentials: true }
            // );

            const newAuthData = await refresh(); //response.data.accessToken;

            // Обновляем заголовок в упавшем запросе и повторяем его
            prevRequest.headers['Authorization'] = `Bearer ${newAuthData.accessToken}`;
            return api(prevRequest);
          } catch (refreshError) {
            // Если refresh-токен тоже протух или невалиден — разлогиниваем пользователя
            await logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Очищаем перехватчики при размонтировании или изменении зависимостей,
    // чтобы не плодить дубликаты
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken]);

  return api;
};