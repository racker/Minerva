import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { MonitorsDetailsPage } from "../../../pages/monitorDetailsPage";
import { browser, element, by } from "protractor";
import { DeleteEventOverlay } from "../../../overlays/deleteEventOverlay";

describe("To test delete event functionality", ()=> {
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
       browser.sleep(5000);
       page2 = new MonitorsDetailsPage();
 
    });

    it("To verify if delete event option is present on monitor details page ",()=>{
      browser.executeScript('window.scrollTo (0,1000);').then(()=>{
         browser.sleep(3000);
         page2.eventCheckBox.get(0).click();
         expect(page2.deleteEventBtn.isDisplayed()).toBe(true)
      });

    });

    it("To verify if delete event popover is displayed when clicked on delete button ",()=>{
      browser.executeScript('window.scrollTo (0,1000);').then(()=>{
         browser.sleep(3000);
         page2.eventCheckBox.get(0).click();
          page2.deleteEventBtn.click();
      })
          let overlay=new DeleteEventOverlay();
          expect(overlay.deleteEventPopOver.isDisplayed()).toBe(true);
    });

    it("To verify if user is able to delete event",()=>{
      browser.executeScript('window.scrollTo (0,1000);').then(()=>{
         browser.sleep(3000);
         page2.eventCheckBox.get(0).click();
          page2.deleteEventBtn.click();
         })
         browser.sleep(3000);
         let overlay=new DeleteEventOverlay();
         overlay.confirmBtnRemovesPopOver();   
   });


});