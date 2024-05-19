export interface Role {
    id: number;
    name: string;
    users_count?: number;
}

export interface RoleFormData {
    name: string;
}

export interface UserFormData {
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    roles: number[];
}

export interface UserListRecord {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    roles: string
}

export interface RawUsers {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    roles: Role[]
}