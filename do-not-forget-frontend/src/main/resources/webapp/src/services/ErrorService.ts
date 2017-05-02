import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoginStateMapService} from "./LoginStateMapService";
import {LOGIN} from "../navigation.constants";

@Injectable()
export class ErrorService {
    private static RUNTIME_EXCEPTION_ID: string = 'java.lang.RuntimeException';
    private static JWT_EXPIRED_EXCEPTION_ID: string = 'io.jsonwebtoken.ExpiredJwtException';

    constructor(private _router: Router) {
    }


    handleExceptionAndReturnMessage(error): string {
        let exception = JSON.parse(error._body);

        if (this._isRuntimeException(exception)) {
            return exception.message;

        } else if (this._isTokenExpired(exception)) {
            sessionStorage.clear();
            this._router.navigate([LOGIN, LoginStateMapService.TOKEN_EXPIRED_STATE]);
            return '';

        }
        return 'Internal server error, please contact support.';
    }

    private _isRuntimeException(exception) {
        return exception.status == 500
            && exception.exception == ErrorService.RUNTIME_EXCEPTION_ID;
    }

    private _isTokenExpired(exception: any) {
        return exception.status == 500
            && exception.exception == ErrorService.JWT_EXPIRED_EXCEPTION_ID;
    }
}