// Данные пользователя, которые хранятся в localStorage 
export interface AuthTokens { 
    user: UserProfile; 
    accessToken: string; 
}


// Профиль пользователя (пример ответа от /users/profile) 
export interface UserProfile { 
    id: number; 
    userName: string; 
    firstName: string;
    lastName: string; 
    // role: 'user' | 'admin'; 
} 


// Тело запросов на логин/регистрацию 
export interface AuthRequest { 
    userName: string; 
    password: string;
}


// Ответ сервера при входе/регистрации
export interface AuthResponse { 
    user: UserProfile; 
    accessToken: string;
} 


// Форма регистрации/логина внутри компонента 
interface FormState { 
    email: string; 
    password: string; 
}