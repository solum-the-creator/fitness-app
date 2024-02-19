export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
}
