import {GeneratorStrategy} from "./GeneratorStrategy";

export class GeneratorData {
    timeAvailable: number = 60;
    strategy: string = GeneratorStrategy.PRIORITY;
}