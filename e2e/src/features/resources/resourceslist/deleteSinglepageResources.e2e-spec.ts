import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { ResourcesListPage } from "../../../pages/resourcelistpage";
import { browser,element, by } from "protractor";
import { DeleteSelectedResourceOverlay } from "../../../overlays/deleteSelectedResourceOverlay";

describe("From single page delete all resources functionality", ()=> {
    let page : AppPage;
    let nav  : navigations;
    let page1: ResourcesListPage;
    
    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();
        browser.manage().window().maximize();
    });
  
    beforeEach(() => {
        nav = new navigations();
        nav.navigateToResources();
        browser.sleep(5000);
        page1 = new ResourcesListPage();
        
    });

    it("To verify if the pop over disappears after clicking on OK button",()=>{
        page1.selectTwentyfiveMonitors();
        page1.deleteBtn.click();  
        browser.sleep(3000);

        let overlay=new DeleteSelectedResourceOverlay();
        overlay.confirmBtn.click();
        overlay.okBtn.click()
        expect(overlay.confirmResourceModal.getAttribute('aria-hidden')).toEqual('true');
    });

    it("To verify if all selected resources from a single page are equal to the number of resources displayed on pop over",()=>{
       page1.selectTwentyfiveMonitors();
       page1.deleteBtn.click();
       browser.sleep(3000);

       let overlay=new DeleteSelectedResourceOverlay();
       overlay.confirmBtn.click();
       expect(overlay.listOfSinglepageResources.getText()).toEqual('25 out of 25 were deleted successfully!');
       browser.sleep(3000);
       overlay.okBtn.click();
    });

});
