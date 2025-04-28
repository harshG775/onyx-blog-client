import { useEffect } from "react";
import { useReducer, createContext, useContext } from "react";
const authServiceDefaultValue = {};
const initialAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};
const AuthContext = createContext({ ...initialAuthState, ...authServiceDefaultValue });
function authReducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload, isAuthenticated: !!action.payload, isLoading: false, error: null };
        case "SET_ERROR":
            return { ...state, error: action.payload, isLoading: false };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        case "RESET_AUTH":
            return { ...initialAuthState, isLoading: false };
        default:
            return state;
    }
}

export const AuthProvider = ({ children, authService = authServiceDefaultValue }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const initializeAuth = async () => {
            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const user = await authService.getCurrentUser();
                dispatch({ type: "SET_USER", payload: user });
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: error.message });
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };
        initializeAuth();
    }, [authService]);

    const signup = async (email, userData = {}) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const user = await authService.signup(email, userData);
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const signin = async (identifier) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const user = await authService.signin(identifier);
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const requestCode = async (email) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            await authService.requestOtp(email);
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const verifyCode = async (email, otp, otpId) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const user = await authService.verifyOtp({ email, otp, otpId });
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const signout = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            await authService.signout();
            dispatch({ type: "RESET_AUTH" });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const getCurrentUser = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const user = await authService.getCurrentUser();
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    const updateUser = async (userData) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const user = await authService.updateUser(userData);
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    return (
        <AuthContext.Provider
            value={{
                ...state,
                signup,
                signin,
                signout,
                requestCode,
                verifyCode,
                getCurrentUser,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
