import {  Pagination } from "../_models/common";

interface TaskParameters {
    criticalStateDuration:number;
        stateExpressions:stateExpressions[];
        flappingDetection:boolean;
        labelSelector:{
            agent_environment:string;
        }
}


export interface Event {
    id: string;
    name: string;
    measurement: string;
    taskParameters?: TaskParameters;
    createdTimestamp: string | Date;
    updatedTimestamp: string | Date;


}

export interface stateExpressions {
    expression: {
        type:string;
        comparator:string;
        valueName:string;
        comparisonValue:number
    },
    state:string;
    message:string;
}

export interface CreateEvent {
    measurement: string,
    name: string;
    taskParameters: {
		labelSelector: {
			agent_environment: string;
		},
		criticalStateDuration: number;
		warningStateDuration: null;
		infoStateDuration: null;
		stateExpressions: [
			{
				state: string;
				message: string;
				expression: stateExpressions;
			}
		]
	}
}


export interface ListEventsPaging extends Pagination {
    content:Event[];   
}

export interface ListEvents {
    content: Event[];
    number: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;

}


