import { CookieService } from "../app/services/cookies/cookie.service";

export const environment = {
    backend: {
        host: 'http://localhost:8000',
        apiHost: 'http://localhost:8000/api',
        apiV1Host: 'http://localhost:8000/api/v1',
        optionsApi: {
            cookies: {
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': CookieService.getCookie('XSRF-TOKEN') ?? '',
                },
                withCredentials: true
            },
            withoutCookies: {
                headers: {
                    Accept: 'application/json',
                },
            },
        }
    },
};
