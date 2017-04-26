import {Injectable} from "@angular/core";
import {AlertConfig} from "../model/alert/AlertConfig";

@Injectable()
export class AlertService {

    retrieveErrorAlertShowConfig(message: string) {
        return AlertConfig.getAlertToShow(message, "error");
    }

    retrieveSuccessAlertShowConfig(message: string) {
        return AlertConfig.getAlertToShow(message, "success");
    }

    retrieveCloseAlertConfig() {
        return AlertConfig.getAlertToClose();
    }

}