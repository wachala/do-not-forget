export class PriorityProvider {
    public retrievePriorityOptions() {
        return ['Very low', 'Low', 'Medium', 'High', 'Urgent'];
    }

    public retrieveDefaultPriorityIndex () {
        return 2;
    }
}