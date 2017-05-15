import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {AUTH_HEADER} from "../auth.constants";

@Injectable()
export class HttpService {

    constructor(private http: Http) {
    }

    private _decorateHeaders(headers: Headers) {
        if (sessionStorage.getItem(AUTH_HEADER))
            headers.append(AUTH_HEADER, sessionStorage.getItem(AUTH_HEADER));
        headers.append('Content-Type', 'application/json')
    }

    get(baseUrl, suffixUrl) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.get(baseUrl + suffixUrl, options);
    }

    getWithParams(baseUrl, suffixUrl, params) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers, search: params});
        return this.http.get(baseUrl + suffixUrl, options);
    }

    post(baseUrl, suffixUrl, data) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.post(baseUrl + suffixUrl, data, options);
    }

    _delete(baseUrl, suffixUrl) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.delete(baseUrl + suffixUrl, options);
    }

    put(baseUrl, suffixUrl, data) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.put(baseUrl + suffixUrl, data, options);
    }
}