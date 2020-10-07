import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser,element, by } from "protractor";
import { DeleteSelectedMonitorOverlay } from "../../../overlays/deleteSelectedMonitorOverlay";


describe("Delete multiple monitor functionality", ()=> {
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

    it("To verify if delete button is enabled when a monitor is selected",()=>{
        page1.checkBoxes.get(1).click();
        expect(page1.deleteBtn.isEnabled()).toBe(true);
     });

    it("To verify “Delete Selected Monitor” pop over is displayed on clicking on delete button",async()=>{
         page1.selectFiveMonitors();
         page1.deleteBtn.click();
         browser.sleep(3000);

         let overlay=new DeleteSelectedMonitorOverlay();
         expect(overlay.deleteSelectedMonitorOverlay.getAttribute('aria-hidden')).toBe('false');
   
    });

    it("To verify if selected list of monitors are displayed on the 'delete monitor pop over' after confirming deletion",async()=>{
        
        var noOfMonitors=page1.selectFiveMonitors();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedMonitorOverlay();
        overlay.confirmBtn.click();
        expect(page1.successListOfMonitors.count()).toEqual(noOfMonitors);
      });

    it("To verify if the pop over disappears after clicking on OK button",async()=>{
        
        page1.selectFiveMonitors();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedMonitorOverlay();
        overlay.confirmBtn.click();
        overlay.okBtn.click()
        expect(overlay.confirmMonitorModal.getAttribute('aria-hidden')).toEqual('true');
        
      });

    });