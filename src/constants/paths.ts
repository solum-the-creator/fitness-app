const PATHS = {
    ROOT: '/',
    AUTH: '/auth',
    GOOGLE_AUTH: 'auth/google',
    CONFIRM_EMAIL: '/auth/confirm-email',
    REGISTRATION: '/auth/registration',
    CHANGE_PASSWORD: '/auth/change-password',
    MAIN: '/main',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    TRAININGS: '/trainings',
    ACHIEVEMENTS: '/achievements',
    PROFILE: '/profile',
    SETTINGS: '/settings',
};

export const PATHS_RESULT = {
    ERROR_LOGIN: '/result/error-login',
    ERROR_CHECK_EMAIL_NO_EXIST: '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL: '/result/error-check-email',
    SUCCESS_CHANGE_PASSWORD: '/result/success-change-password',
    ERROR_CHANGE_PASSWORD: '/result/error-change-password',
    SUCCESS: '/result/success',
    ERROR: '/result/error',
    ERROR_USER_EXIST: '/result/error-user-exist',
};

export default PATHS;
