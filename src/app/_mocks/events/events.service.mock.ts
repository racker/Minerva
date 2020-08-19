import { default as eventListMock } from './getAllEvents.json';

export class EventsMock {
    eventList = eventListMock;
    single = eventListMock.content[0];
}
