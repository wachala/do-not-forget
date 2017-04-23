import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {RouterModule} from "@angular/router";
import {COMPONENTS} from "./components";
import {ROUTES} from "./routes";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpService} from "../services/HttpService";
import {AuthGuard} from "../guards/AuthGuard";
import {NonAuthGuard} from "../guards/NonAuthGuard";
import {AuthService} from "../services/AuthService";
import {CustomFormsModule} from 'ng2-validation'

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        CustomFormsModule
    ],
    providers: [HttpService, AuthGuard, NonAuthGuard, AuthService],
    declarations: COMPONENTS,
    bootstrap: [AppComponent]
})
export class AppModule {
}