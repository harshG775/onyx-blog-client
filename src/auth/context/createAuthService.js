import axios from "axios";

export const createAuthService = (config = {}) => {
    const { apiUrl = "/api/auth" } = config;
    const instance = axios.create({ baseURL: apiUrl });

    // Smart interceptor for token refresh
    // instance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config;
    //         if (error.response?.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true;
    //             await instance.post("/signout");
    //             return Promise.reject(new Error("Session expired"));
    //         }

    //         return Promise.reject(error);
    //     },
    // );

    return {
        signup: async (email, userData = {}) => {
            const resp = await instance.post(`${apiUrl}/signup`, { email, ...userData });
            return resp.data;
        },

        signin: async (email) => {
            const resp = await instance.post(`${apiUrl}/signin`, { email });
            return resp.data;
        },
        requestCode: async (email) => {
            const resp = await instance.post(`${apiUrl}/request-code`, { email });
            return resp.data;
        },

        verifyCode: async ({ email, otp, otpId }) => {
            const resp = await instance.post(`${apiUrl}/verify-code`, { email, otp, otpId }, { withCredentials: true });
            return resp.data;
        },
        signout: async () => {
            const resp = await instance.post(`${apiUrl}/signout`);
            return resp.data;
        },

        getCurrentUser: async () => {
            const resp = await instance.get(`${apiUrl}/me`, { withCredentials: true });
            return resp.data;
        },
        updateUser: async (userData) => {
            const resp = await instance.patch(`${apiUrl}/me`, userData);
            return resp.data;
        },
    };
};
