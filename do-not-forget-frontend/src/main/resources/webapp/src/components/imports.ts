import {BrowserModule} from "@angular/platform-browser";
import {NglModule} from "ng-lightning";
import {CustomFormsModule} from "ng2-validation";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./routes";

export const IMPORTS = [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NglModule.forRoot()
];