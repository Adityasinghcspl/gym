import { Role } from "../utils/roleChecker";

export const isAuthenticated = (): boolean => {
    // Implement authentication logic, e.g., check if token is stored in localStorage
    return !!localStorage.getItem('token');
};

export const getUserRole = (): Role => {
    // Retrieve and return the user role from stored information
    return localStorage.getItem('userRole') as Role;
};
