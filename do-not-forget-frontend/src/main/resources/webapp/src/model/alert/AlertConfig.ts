export class AlertConfig {
    show: boolean;
    message: string = '';
    type: string = '';
    timeout: number = 3000;

    constructor(alertMessage: string, alertType: string, show: boolean) {
        this.message = alertMessage;
        this.type = alertType;
        this.show = show;
    }

    static getAlertToShow(alertMessage: string, alertType: string): AlertConfig {
        return new AlertConfig(alertMessage, alertType, true);
    }

    static getAlertToClose() {
        return new AlertConfig('', '', false);
    }

    onClose($event) {
        this.show = false;
    }
}