import {NgModule} from "@angular/core";
import {AppComponent} from "./app/app.component";
import {COMPONENTS} from "./components";
import {IMPORTS} from "./imports";
import {PROVIDERS} from "./providers";

@NgModule({
    imports: IMPORTS,
    providers: PROVIDERS,
    declarations: COMPONENTS,
    bootstrap: [AppComponent]
})
export class AppModule {
}