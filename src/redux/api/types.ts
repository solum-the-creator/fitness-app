export type User = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: Tariff;
};

export type UpdateUserRequest = Partial<User> & { password?: string };

export type Tariff = {
    tariffId: string;
    expired: string;
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

export type Exercise = {
    tempId?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type ExerciseResponse = Exercise & { _id: string };

export type Training = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: {
        repeat?: boolean;
        period?: number;
        jointTraining?: boolean;
        participants?: string[];
    };
    exercises: Exercise[];
};

export type TrainingResponse = Omit<Training, 'exercises'> & {
    _id: string;
    userId: string;
    exercises: ExerciseResponse[];
};

export type TrainingList = Array<{ name: string; key: string }>;

export type TariffList = Array<{
    _id?: string;
    name: string;
    periods: Array<{
        text: string;
        cost: number;
        days: number;
    }>;
}>;

export type AddTariffRequest = {
    tariffId: string;
    days: number;
};

export type UploadImage = {
    name: string;
    url: string;
};

export type TrainingPartner = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string | null;
    status: InviteStatus | null;
};

export type InviteStatus = 'accepted' | 'pending' | 'rejected';

export type AddInviteRequest = {
    to: string;
    trainingId: string;
};

export type UserInvite = {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    imageSrc: string | null;
};

export type Invite = {
    _id: string;
    from: UserInvite;
    training: TrainingResponse;
    status: InviteStatus;
    createdAt: string;
    to: UserInvite;
};

export type UpdateInviteRequest = {
    id: string;
    status: 'accepted' | 'rejected';
};
