import {BrowserModule} from "@angular/platform-browser";
import {NglModule} from "ng-lightning";
import {CustomFormsModule} from "ng2-validation";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {NgbModule, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./routes";
import {DndModule} from "ng2-dnd";

export const IMPORTS = [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NglModule.forRoot(),
    DndModule.forRoot()
];