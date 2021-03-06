import { AppPage } from "../../../../../../e2e/src/pages/app.po";
import { navigations } from "../../../../../../e2e/src/commons/navigations";
import { MonitorsListPage } from "../../../../../../e2e/src/pages/monitorListPage";
import { MonitorsDetailsPage } from "../../../../../../e2e/src/pages/monitorDetailsPage";
import { browser, Key, element, by } from "protractor";
import { EventDetailsPage } from "../../../../../../e2e/src/pages/eventDetailsPage";
import { default as event } from "../../../../../../src/app/_mocks/events/getAllEvents.json";

describe("Test display of event details", ()=> {
    let page : AppPage;
    let nav  : navigations;
    let page1: MonitorsListPage;
    let page2: MonitorsDetailsPage;
    
 
    beforeAll(() => {
       page = new AppPage();
       page.navigateTo();
       browser.manage().window().maximize();
    });
 
    beforeEach(() => {
       nav = new navigations();
       nav.navigateToAdmin();
       browser.sleep(5000);
       page1 = new MonitorsListPage();
       page1.monitorName().click();
       browser.sleep(3000);
       page2 = new MonitorsDetailsPage();
 
     });

     it("To verify details of a selected event",()=>{
       
       page2.eventName('cpu').click();
       let page3=new EventDetailsPage();
       
       //check the display of event fields
       expect(page3.pageTitle().isDisplayed()).toBe(true);
       expect(page3.labelMonitorType.isDisplayed()).toBe(true);
       expect(page3.labelagentEnvironment.isDisplayed()).toBe(true);
       expect(page3.labelCreatedDate.isDisplayed()).toBe(true);
       expect(page3.labelLastUpdated.isDisplayed()).toBe(true);
       
       //check the display of event values
       expect(page3.eventNameHeader(event.content[0].name).getText()).toEqual(event.content[0].name);
       expect(page3.monitorType.getText()).toEqual(event.content[0].name);
       expect(page3.agentEnvironment.getText()).toEqual(event.content[0].taskParameters.labelSelector.agent_environment);
       expect(page3.createdDate.getText()).toEqual(page3.dateConversion(event.content[0].createdTimestamp));
       expect(page3.LastUpdated.getText()).toEqual(page3.dateConversion(event.content[0].updatedTimestamp));
    
      });

      it("To verify expression section of an event is loaded",()=>{
         page2.eventName('cpu').click();
         let page3=new EventDetailsPage();

         expect(page3.labelExpressions.isDisplayed()).toBe(true);
         expect(page3.state.isDisplayed()).toBe(true);
         expect(page3.message.isDisplayed()).toBe(true);
         expect(page3.rowExpression.isDisplayed()).toBe(true);

      })
});