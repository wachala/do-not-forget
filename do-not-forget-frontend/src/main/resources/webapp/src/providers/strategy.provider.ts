import {GeneratorStrategy} from "../model/generator/GeneratorStrategy";

export class GeneratorStrategyProvider {
    private _generatorStrategyOptions = [
        {
            name: GeneratorStrategy.PRIORITY,
            description: "I want to do tasks with highest priority."
        },
        {
            name: GeneratorStrategy.DEADLINE,
            description: "I want to do tasks that need to be finished soon."
        },
        {
            name: GeneratorStrategy.OLDEST,
            description: "I want to finish tasks that have been waited longest."
        },
        {
            name: GeneratorStrategy.VARIETY,
            description: "I want to do number of different tasks."
        }
    ];

    public retrieveStrategyOptions() {
        return this._generatorStrategyOptions;
    }
}