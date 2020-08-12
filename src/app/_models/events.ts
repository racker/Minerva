import {  Pagination } from "../_models/common";

interface TaskParameters {
    criticalStateDuration:number;
        stateExpressions:StateExpressions[];
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

export interface StateExpressions {
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
				expression: StateExpressions;
			}
		]
	}
}


export interface Events extends Pagination {
    content:Event[];   
}



