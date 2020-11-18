import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser,element, by } from "protractor";
import { DeleteSelectedMonitorOverlay } from "../../../overlays/deleteSelectedMonitorOverlay";

describe("Single page monitors list", ()=> {
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

    it("To verify “Delete Selected Monitor” pop over is displayed on clicking on delete button when all the monitors are selected from a single page",()=>{
        page1.selectTwentyfiveMonitors();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedMonitorOverlay();
        expect(overlay.deleteSelectedMonitorOverlay.getAttribute('aria-hidden')).toBe('false');
        overlay.cancelBtn.click();
    });

    it("To verify if delete button is enabled when all the monitors are selected from a single page",()=>{
        page1.headerCheckBox.click();
        browser.sleep(3000);
        expect(page1.deleteBtn.isEnabled()).toBe(true);
        
    });
});
