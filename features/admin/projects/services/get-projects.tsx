import axios from 'axios';

export const fetchProjects = async ({ pageParam = 1 }) => {
    // We use the pagination API we built earlier
    const { data } = await axios.get(`/api/projects`, {
        params: {
            page: pageParam,
            limit: 4, // You can make this dynamic if needed
        },
    });
    return data;
};