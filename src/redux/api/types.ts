export type User = {
    email: string;
    firstName?: string;
    lastName?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
};

export type Feedback = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type RegistrationRequest = {
    email: string;
    password: string;
};

export type CheckEmailResponse = {
    email: string;
    message: string;
};

export type ConfrimEmailRequest = {
    email: string;
    code: string;
};

export type ConfrimEmailResponse = {
    message: string;
};

export type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};
