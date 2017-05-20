import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoginStateMapService} from "./LoginStateMapService";
import {LOGIN} from "../navigation.constants";

@Injectable()
export class ErrorService {
    private static RUNTIME_EXCEPTION_ID: string = 'java.lang.RuntimeException';
    private static JWT_EXPIRED_EXCEPTION_ID: string = 'io.jsonwebtoken.ExpiredJwtException';
    private static WRONG_CREDENTIALS_ERROR_DATA = {
        error: "Unauthorized",
        message: "Authentication Failed: Bad credentials",
        path: "/login",
        status: 401
    };

    constructor(private _router: Router) {
    }


    handleExceptionAndReturnMessage(error): string {
        let exception = JSON.parse(error._body);

        if (this._isBadCredentials(exception)) {
            return 'Wrong login or password, try again';
        }

        if (this._isRuntimeException(exception)) {
            return exception.message;

        }

        if (this._isTokenExpired(exception)) {
            sessionStorage.clear();
            this._router.navigate([LOGIN, LoginStateMapService.TOKEN_EXPIRED_STATE]);
            return '';
        }

        return 'Something went wrong, please try again later.';
    }

    private _isRuntimeException(exception) {
        return exception.status == 500
            && exception.exception == ErrorService.RUNTIME_EXCEPTION_ID;
    }

    private _isTokenExpired(exception: any) {
        return exception.status == 500
            && exception.exception == ErrorService.JWT_EXPIRED_EXCEPTION_ID;
    }

    private _isBadCredentials(exception: any) {
        return exception.status == ErrorService.WRONG_CREDENTIALS_ERROR_DATA.status
            && exception.error == ErrorService.WRONG_CREDENTIALS_ERROR_DATA.error
            && exception.path == ErrorService.WRONG_CREDENTIALS_ERROR_DATA.path
            && exception.message == ErrorService.WRONG_CREDENTIALS_ERROR_DATA.message;
    }
}