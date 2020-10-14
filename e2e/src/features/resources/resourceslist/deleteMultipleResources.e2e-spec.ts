import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { browser, element,by} from "protractor";
import { ResourcesListPage } from "../../../pages/resourcelistpage";
import { DeleteSelectedResourceOverlay } from "../../../overlays/deleteSelectedResourceOverlay";
import { protractor } from "protractor/built/ptor";


describe("Delete multiple resources functionality", ()=> {
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

    it("To verify if delete button is enabled when a resource is selected",()=>{
        page1.resourcesCheckBoxes.get(0).click();
        expect(page1.deleteBtn.isEnabled()).toBe(true);
     });

    
    it("To verify “Delete Selected Resource” pop over is displayed on clicking on delete button",()=>{
         page1.selectFiveResources();
         page1.deleteBtn.click();
         browser.sleep(3000);

         let overlay=new DeleteSelectedResourceOverlay();
         expect(overlay.deleteSelectedResourceOverlay.getAttribute('aria-hidden')).toBe('false');
         overlay.cancelBtn.click();
   
    });

    it("To verify if no.of.selected resources  is equal to the no.of.resources displayed on pop over",()=>{
        
        var noOfResources=page1.selectFifteenResources();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedResourceOverlay();
        overlay.confirmBtn.click();
        expect(overlay.successListOfResources.count()).toEqual(noOfResources);
        browser.sleep(2000);
        overlay.okBtn.click();
      });

    it("To verify if the pop over disappears after clicking on OK button",()=>{
        
        page1.selectFiveResources();
        page1.deleteBtn.click();
        browser.sleep(3000);

        let overlay=new DeleteSelectedResourceOverlay();
        overlay.confirmBtn.click();
        overlay.okBtn.click()
        expect(overlay.confirmMonitorModal.getAttribute('aria-hidden')).toEqual('true');
      
      });
    });