export type LoginForm = {
    email: string;
    password: string;
};

export type SignUpForm = LoginForm & {
    fullName: string;
};
export type LoginResponse = {
    user: string;
    id: string;
    token: string;
};
