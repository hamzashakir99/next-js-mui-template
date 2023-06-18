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
        return {
            getProfile,
        }
    } catch (error) {
        console.log(error);
    }
}