import {AddTaskComponent} from "./add/add-task/add.task.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
export const ROUTES = [
    {
        path: 'addTask',
        component: AddTaskComponent
    },
    {
        path: 'browseTasks',
        component: BrowseTasksComponent
    }
];