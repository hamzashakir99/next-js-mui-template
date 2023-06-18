import { serverInstance } from "@/lib/index";

export const userAPIs = async(token: string) => {
    try {
        const headers = { Authorization: `Bearer ${token}` }
        const getProfile = async() => {
            console.log(token);
            return await serverInstance.get('/api/profile', {
                headers
            });
        }
        const updateProfile = async(data: object) => {
            console.log(token);
            return await serverInstance.patch('/api/profile', data, {
                headers
            });
        }
        return {
            getProfile,
            updateProfile
        }
    } catch (error) {
        console.log(error);
    }
}