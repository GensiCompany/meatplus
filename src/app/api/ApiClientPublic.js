export default async function fetchDataWithoutAuth(url, method = 'GET', body = null) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_PUBLIC;
    const baseUrl = apiUrl;

    const headers = {};

    if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers,
        cache: 'no-store',
    };

    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            options.body = JSON.stringify(body);
        }
    }

    const separator = url.includes('?') ? '&' : '?';
    const fullUrl = `${baseUrl}${url}${separator}origin=meatplussynckiovn.synck.io.vn`;
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }

    return response;
}
