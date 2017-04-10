import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {RouterModule} from "@angular/router";
import {COMPONENTS} from "./components";
import {ROUTES} from "./routes";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        NgbModule.forRoot(),
        FormsModule,
        HttpModule
    ],
    declarations: COMPONENTS,
    bootstrap: [AppComponent]
})
export class AppModule {
}