import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    token: string | null;
    role: number | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    hasRole: (role: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<number | null>(null);

    useEffect(() => {
        if (token) {
            const decodedToken: { type: number } = jwtDecode(token);
            setRole(decodedToken.type);
        } else {
            setRole(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
    };

    const isAuthenticated = () => !!token;

    const hasRole = (requiredRole: number) => role === requiredRole;

    return (
        <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
