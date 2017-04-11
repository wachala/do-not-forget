import {TopNavbarComponent} from "./nav/topnavbar/topnavbar.component";
import {NavbarComponent} from "./nav/navbar/navbar.component";
import {AppComponent} from "./app/app.component";
import {NavSimpleFieldComponent} from "./nav/simplefield/simplefield.component";
import {NavDropdownFieldComponent} from "./nav/dropdownfield/dropdownfield.component";
import {AddTaskComponent} from "./add/add-task/add.task.component";
import {AddTaskFormComponent} from "./add/add-task-form/add-task-form.component";
import {DatePickerComponent} from "./commons/datepicker/datepicker.component";
import {BrowseTasksComponent} from "./browse/browse-task/browse.task.component";
import {TaskViewComponent} from "./browse/task-view/task-view.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const COMPONENTS = [
    AppComponent,
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
