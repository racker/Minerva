import { default as eventMockSingle } from './getSingleEvent.json';
import { default as eventListMock } from './getAllEvents.json';

import { Event, ListEvents } from '../../_models/events';

let events: Event = <Event>{
    id: eventMockSingle.id,
    name: eventMockSingle.name,
    measurement: eventMockSingle.measurement,
    createdTimestamp: new Date(eventMockSingle.createdTimestamp),
    updatedTimestamp: new Date(eventMockSingle.updatedTimestamp),
    taskParameters: {
        criticalStateDuration: eventMockSingle.taskParameters.criticalStateDuration,
        stateExpressions:[
            {
                expression:{
                    type:eventMockSingle.taskParameters.stateExpressions["expression"].type,
                    comparator:eventMockSingle.taskParameters.stateExpressions["expression"].comparator,
                    valueName:eventMockSingle.taskParameters.stateExpressions["expression"].valueName,
                    comparisonValue:eventMockSingle.taskParameters.stateExpressions["expression"].comparisonValue
                },
                state:eventMockSingle.taskParameters.stateExpressions["state"],
                message:eventMockSingle.taskParameters.stateExpressions["message"]
            }
        ],
        flappingDetection:eventMockSingle.taskParameters.flappingDetection,
        labelSelector:eventMockSingle.taskParameters.labelSelector
    },
}


export class eventsMock {
    eventList: ListEvents = eventListMock;
    single: Event = events;
}
