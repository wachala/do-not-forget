export class PriorityProvider {
    public retrievePriorityOptions() {
        return [
            {name: 'Very low', cssclass: 'dnf-very-low-priority'},
            {name: 'Low', cssclass: 'dnf-low-priority'},
            {name: 'Medium', cssclass: 'dnf-medium-priority'},
            {name: 'High', cssclass: 'dnf-high-priority'},
            {name: 'Urgent', cssclass: 'dnf-urgent-priority'}
        ];
    }

    public retrieveDefaultPriorityIndex() {
        return 2;
    }
}