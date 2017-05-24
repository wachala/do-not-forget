import {TopNavbarComponent} from "./nav/topnavbar/topnavbar.component";
import {AppComponent} from "./app/app.component";
import {AddTaskComponent} from "./add/add-task/add.task.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
import {TaskViewComponent} from "./browse/task-view/task-view.component";
import {DateInFutureValidator} from "../validators/date.validator";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthorizedMainComponent} from "./authorized-main/authorized-main.component";
import {UnauthorizedMainComponent} from "./unauthorized-main/unauthorized-main.component";
import {EditTaskComponent} from "./edit/edit.component";
import {TaskStateFilterPipe} from "../pipes/state/TaskStateFilterPipe";
import {HistoricalTaskFilterPipe} from "../pipes/HistoricalTaskFilterPipe";
import {CurrentTaskFilterPipe} from "../pipes/CurrentTaskFilterPipe";
import {ContainsStringFilterPipe} from "../pipes/ContainsStringFilterPipe";
import {ExpiredTasksComponent} from "./expired-tasks/expired-tasks.component";
import {KanbanBoardComponent} from "./browse/kanban-board/kanban-board.component";
import {ModifyTaskFormComponent} from "./modify-task-form/modify-task-form.component";

export const COMPONENTS = [
    AppComponent,
    AuthorizedMainComponent,
    UnauthorizedMainComponent,
    //login
    LoginComponent,
    RegisterComponent,
    //navbar
    TopNavbarComponent,
    //adding task
    AddTaskComponent,
    EditTaskComponent,
    ModifyTaskFormComponent,
    //browsing tasks
    BrowseTasksComponent,
    TaskViewComponent,
    ExpiredTasksComponent,
    KanbanBoardComponent,
    //commons
    //validators
    DateInFutureValidator,

    //pipes
    TaskStateFilterPipe,
    HistoricalTaskFilterPipe,
    CurrentTaskFilterPipe,
    ContainsStringFilterPipe
];
