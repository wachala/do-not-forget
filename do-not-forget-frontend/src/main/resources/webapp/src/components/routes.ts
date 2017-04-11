import {AddTaskComponent} from "./add/add-task/add.task.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
export const ROUTES = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'addTask',
        component: AddTaskComponent
    },
    {
        path: 'browseTasks',
        component: BrowseTasksComponent
    }
];