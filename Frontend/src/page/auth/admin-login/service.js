import apiService from '../../../services/api.service';

const adminLogin = async ({ email, password }) => {
    try {
        if (!email || !password) {
            return { error: 'Email and password are required' };
        }

        const response = await apiService.loginApiInstance.post('/api/v1/auth/admin',
            {
                email,
                password
            });
        return response.data;
    }
    catch (error) {
        return { error: error?.response?.data?.message || 'An unknown error occurred' };
    }
};


export { adminLogin };