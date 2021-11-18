export type LoginForm = {
    email: string;
    password: string;
};

export type LoginResponse = {
    user: string;
    id: string;
    token: string;
};

export type SignUpForm = LoginForm & {
    fullName: string;
};
