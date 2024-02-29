export interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
}

export interface Feedback {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegistrationRequest {
    email: string;
    password: string;
}

export interface CheckEmailResponse {
    email: string;
    message: string;
}

export interface ConfrimEmailRequest {
    email: string;
    code: string;
}

export interface ConfrimEmailResponse {
    message: string;
}

export interface ChangePasswordRequest {
    password: string;
    confirmPassword: string;
}
