import {TopNavbarComponent} from "./nav/topnavbar/topnavbar.component";
import {NavbarComponent} from "./nav/navbar/navbar.component";
import {AppComponent} from "./app/app.component";
import {NavSimpleFieldComponent} from "./nav/simplefield/simplefield.component";
import {NavDropdownFieldComponent} from "./nav/dropdownfield/dropdownfield.component";
import {AddTaskComponent} from "./add/add-task/add.task.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
import {TaskViewComponent} from "./browse/task-view/task-view.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthorizedMainComponent} from "./authorized-main/authorized-main.component";
import {UnauthorizedMainComponent} from "./unauthorized-main/unauthorized-main.component";

export const COMPONENTS = [
    AppComponent,
    AuthorizedMainComponent,
    UnauthorizedMainComponent,
    //login
    LoginComponent,
    RegisterComponent,
    //navbar
    NavbarComponent,
    TopNavbarComponent,
    NavSimpleFieldComponent,
    NavDropdownFieldComponent,
    //adding task
    AddTaskComponent,

    //browsing tasks
    BrowseTasksComponent,
    TaskViewComponent
    //commons

];
