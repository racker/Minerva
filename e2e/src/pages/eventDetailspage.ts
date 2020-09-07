import { element, by } from "protractor";
import { DatePipe } from "@angular/common";
import { default as event } from "../../../src/app/_mocks/events/getAllEvents.json";


export class EventDetailsPage{

    labelMonitorType      =element(by.id('lblMonitorType'));
    labelagentEnvironment =element(by.id('label.key'));  
    labelCreatedDate      =element(by.id("lblCreatedDate"));
    labelLastUpdated      =element(by.id('lblLast'));
    monitorType           =element(by.xpath("//div[@id='valueMontyp']"));
    agentEnvironment      =element(by.xpath("//div[@id='localdev']"));
    createdDate           =element(by.xpath("//div[@id='valueCreatedDate']"));
    LastUpdated           =element(by.xpath("//div[@id='valueLast']"));


    pageTitle(){
        
        return(element(by.xpath("//h3[contains(text(),'Event Details')]")));
    }

    eventNameHeader(event:string){
        return(element(by.xpath("//h2[contains(text(),'"+event+"')]")));
    }

    dateConversion(timestamp:string){
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(timestamp, 'MM/dd/yyyy');
    }


}