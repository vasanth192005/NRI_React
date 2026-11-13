
import axios from 'axios';

const api = axios.create({
    baseURL: '/api/admin',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

let csrfToken = '';

export const adminService = {

    async getCsrf() {
        const res = await api.get('/csrf.php');
        csrfToken = res.data.csrfToken;
        return res.data;
    },

    async login(username, password) {

        const res = await api.post(
            '/login.php',
            { username, password },
            {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            }
        );

        csrfToken = res.data.csrfToken;

        return res.data;
    },

    async me() {
        const res = await api.get('/me.php');
        csrfToken = res.data.csrfToken;
        return res.data;
    },

    async logout() {
        const res = await api.post(
            '/logout.php',
            {},
            {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            }
        );

        csrfToken = '';
        return res.data;
    },

    async dashboard() {
        const res = await api.get('/dashboard.php');
        return res.data;
    },

    async enquiries(params = {}) {
        const res = await api.get('/enquiries.php', {
            params
        });

        return res.data;
    },

    async enquiryDetails(id) {
        const res = await api.get('/enquiry-details.php', {
            params: { id }
        });

        return res.data;
    },

    async updateStatus(id, status) {
        const res = await api.post(
            '/update-status.php',
            { id, status },
            {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            }
        );

        return res.data;
    }
};
