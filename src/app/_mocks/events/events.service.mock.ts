import { default as eventMockSingle } from './getSingleEvent.json';
import { default as eventListMock } from './getAllEvents.json';

import { Event, ListEvents } from '../../_models/events';



export class eventsMock {
    eventList: ListEvents = eventListMock;
    single =  eventListMock[0];
}
