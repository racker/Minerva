import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser,element, by } from "protractor";
import { DeleteSelectedMonitorOverlay } from "../../../overlays/deleteSelectedMonitorOverlay";

describe("From single page delete all monitors functionality", ()=> {
    let page : AppPage;
    let nav  : navigations;
    let page1: MonitorsListPage;
    
    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();
        browser.manage().window().maximize();
    });
  
     beforeEach(() => {
        nav = new navigations();
        nav.navigateToMonitor();
        browser.sleep(5000);
        page1 = new MonitorsListPage();
        
    });

    it("To verify if delete button is enabled when all the monitors are selected from a single page",()=>{
        page1.headerCheckBox.click();
        browser.sleep(3000);
        expect(page1.deleteBtn.isEnabled()).toBe(true);
        
     });

    it("To verify “Delete Selected Monitor” pop over is displayed on clicking on delete button when all the monitors are selected from a single page",()=>{
        page1.selectTwentyfiveMonitors();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedMonitorOverlay();
        expect(overlay.deleteSelectedMonitorOverlay.getAttribute('aria-hidden')).toBe('false');
        overlay.cancelBtn.click();
   });

   it("To verify if all selected monitors from a single page are equal to the no.of.monitors displayed on pop over",()=>{
       page1.selectTwentyfiveMonitors();
       page1.deleteBtn.click();
       browser.sleep(3000);

       let overlay=new DeleteSelectedMonitorOverlay();
       overlay.confirmBtn.click();
       expect(overlay.listOfSinglepageMonitors.getText()).toEqual('25 out of 25 were deleted successfully!');
       browser.sleep(3000);
       overlay.okBtn.click();
    });

    it("To verify if the pop over disappears after clicking on OK button",()=>{
        
        page1.selectTwentyfiveMonitors();
        page1.deleteBtn.click();  
        browser.sleep(3000);

        let overlay=new DeleteSelectedMonitorOverlay();
        overlay.confirmBtn.click();
        overlay.okBtn.click()
        expect(overlay.confirmMonitorModal.getAttribute('aria-hidden')).toEqual('true');
      
      });
    
});
