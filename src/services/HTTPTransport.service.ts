const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

function queryStringify(data: { [s: string]: unknown; } | ArrayLike<unknown>) {
    let strResult = '?';
    for (const [key, value] of Object.entries(data)) {
        strResult += (strResult !== '?') ? '&' : '';
        strResult += Array.isArray(value) ? `${key}=${value.toString()}` : `${key}=${value}`;
    }
    return strResult;
}

export class HTTPTransportService {
    get = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.GET});
    };

    put = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT});
    };

    post = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST});
    };

    delete = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE});
    };

    request = (url: string, options: { method: any; data?: any; }, timeout = 5000) => {
        const {method, data} = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            url = method === 'GET' ? url + queryStringify(data) : url;
            xhr.open(method, url);
            xhr.timeout = timeout;

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.ontimeout = reject;
            xhr.onabort = reject;
            xhr.onerror = reject;

            if(method === 'GET') {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
