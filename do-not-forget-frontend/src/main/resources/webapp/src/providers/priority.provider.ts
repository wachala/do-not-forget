import {Priority} from "../model/Priority";
export class PriorityProvider {
    private _priorityOptions = [
        {name: Priority.VERY_LOW},
        {name: Priority.LOW},
        {name: Priority.MEDIUM},
        {name: Priority.HIGH},
        {name: Priority.URGENT}
    ];

    public retrievePriorityLabel(priority) {
        return this._priorityOptions[priority].name;
    }

    public retrievePriorityOptions() {
        return this._priorityOptions;
    }

    public retrieveDefaultPriorityIndex() {
        return Priority.DEFAULT_INDEX;
    }


}