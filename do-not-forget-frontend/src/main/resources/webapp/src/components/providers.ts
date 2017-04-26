import {AuthService} from "../services/AuthService";
import {NonAuthGuard} from "../guards/NonAuthGuard";
import {AuthGuard} from "../guards/AuthGuard";
import {HttpService} from "../services/HttpService";

export const PROVIDERS = [
    HttpService, AuthGuard, NonAuthGuard, AuthService
];