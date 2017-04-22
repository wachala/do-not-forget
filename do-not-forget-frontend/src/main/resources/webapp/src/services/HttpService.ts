import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AUTH_HEADER} from "../auth.constants";

@Injectable()
export class HttpService {

    constructor(private http: Http) {}

    private _decorateHeaders(headers: Headers) {
        headers.append(AUTH_HEADER, localStorage.getItem(AUTH_HEADER));
        headers.append('Content-Type', 'application/json')
    }

    get(url) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options);
    }

    post(url, data) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, data, options);
    }

    _delete(url) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options);
    }

    put(url, data) {
        let headers = new Headers();
        this._decorateHeaders(headers);
        let options = new RequestOptions({headers: headers});
        return this.http.put(url, data, options);
    }
}