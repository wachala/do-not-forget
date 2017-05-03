import {Injectable} from "@angular/core";
import {AlertService} from "./AlertService";

@Injectable()
export class LoginStateMapService {
    public static TOKEN_EXPIRED_STATE = 'tokenExpiredState';
    public static REGISTER_SUCCESSFUL_STATE = 'registerSuccessfulState';

    private stateToAlertConfigMap = {};

    constructor(private _alertsService: AlertService) {
        this.stateToAlertConfigMap[LoginStateMapService.TOKEN_EXPIRED_STATE]
            = this._alertsService
            .retrieveErrorAlertShowConfig('Session expired, log in once again');

        this.stateToAlertConfigMap[LoginStateMapService.REGISTER_SUCCESSFUL_STATE]
            = this._alertsService
            .retrieveSuccessAlertShowConfig('User added with success, log in now');
    }

    retrieveConfigForState(state: string) {
        return this.stateToAlertConfigMap[state] ? this.stateToAlertConfigMap[state] :
            this._alertsService.retrieveCloseAlertConfig;
    }

}