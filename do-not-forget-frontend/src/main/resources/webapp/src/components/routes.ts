import {AddTaskComponent} from "./add/add-task/add.task.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UnauthorizedMainComponent} from "./unauthorized-main/unauthorized-main.component";
import {AuthorizedMainComponent} from "./authorized-main/authorized-main.component";
import {NonAuthGuard} from "../guards/NonAuthGuard";
import {AuthGuard} from "../guards/AuthGuard";
import {EditTaskComponent} from "./edit/edit.component";
import {GenerateTodoComponent} from "./browse/generate-todo/generate.todo.component";

export const ROUTES = [
    {
        path: '',
        component: UnauthorizedMainComponent,
        canActivate: [NonAuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'login/:state',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: 'authorized',
        component: AuthorizedMainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'browseTasks',
                pathMatch: 'full'
            },
            {
                path: 'addTask',
                component: AddTaskComponent
            },
            {
                path: 'browseTasks',
                component: BrowseTasksComponent
            },
            {
                path: 'editTask/:id',
                component: EditTaskComponent
            },
            {
                path: 'generateTodo',
                component: GenerateTodoComponent
            }
        ]
    }
];