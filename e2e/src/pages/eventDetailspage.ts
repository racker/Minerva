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

    // constructor(private datepipe: DatePipe){
    // }


    pageTitle(){
        
        return(element(by.xpath("//h3[contains(text(),'Event Details')]")));
    }

    eventNameHeader(event:string){
        return(element(by.xpath("//h2[contains(text(),'"+event+"')]")));
    }

    dateConversionForCreatedTimestamp(){
        const datepipe: DatePipe = new DatePipe('en-US');
        let srcDate=event.content[0].createdTimestamp;
        let latest_date =datepipe.transform(srcDate, 'MM/dd/yyyy');
        return latest_date;

    }

    dateConversionForUpdatedTimestamp(){
        const datepipe: DatePipe = new DatePipe('en-US');
        let srcDate=event.content[0].updatedTimestamp;
        let latest_date =datepipe.transform(srcDate, 'MM/dd/yyyy');
        return latest_date;

    }


}