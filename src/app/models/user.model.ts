export interface AppUser {
    uid: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    pinCode?: string;
    role?: 'user' | 'admin';
}
