import axios from "axios";

export const createAuthService = (config = {}) => {
    const { apiUrl = "/api/auth" } = config;
    const instance = axios.create({ baseURL: apiUrl });

    // Smart interceptor for token refresh
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await instance.get("/signout", { withCredentials: true });
                return Promise.reject(new Error("Session expired"));
            }

            return Promise.reject(error);
        },
    );

    return {
        signup: async (email, userData = {}) => {
            const resp = await instance.post(`${apiUrl}/signup`, { email, ...userData });
            return resp.data.data;
        },

        signin: async (identifier) => {
            const resp = await instance.post(`${apiUrl}/signin`, { identifier });
            return resp.data.data;
        },
        requestCode: async (email) => {
            const resp = await instance.post(`${apiUrl}/request-code`, { email });
            return resp.data.data;
        },

        verifyCode: async (email, { otp, otpId, otpType }) => {
            const resp = await instance.post(
                `${apiUrl}/verify-code`,
                { email, otp, otpId, otpType },
                { withCredentials: true },
            );
            return resp.data.data;
        },
        signout: async () => {
            const resp = await instance.get(`${apiUrl}/signout`, { withCredentials: true });
            return resp.data.data;
        },

        getCurrentUser: async () => {
            const resp = await instance.get(`${apiUrl}/me`, { withCredentials: true });
            return resp.data.data;
        },
        updateUser: async (userData) => {
            const resp = await instance.patch(`${apiUrl}/me`, userData);
            return resp.data.data;
        },
    };
};
