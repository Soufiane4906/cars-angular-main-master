export interface UserRegistrationDTO {
    username: string;
    password: string;
    role?: string; 
}

export interface UserLoginDTO {
    username: string;
    password: string;
}

export interface UserResponseDTO {
    username: string;
    role: string; 
    jwt: string; 
}