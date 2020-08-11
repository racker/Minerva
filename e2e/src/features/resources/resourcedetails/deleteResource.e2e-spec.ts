import { AppPage } from "../../../pages/app.po";
import { element, by, browser, Browser } from "protractor";
import { resourcesListPage } from "../../../pages/resourcelistpage";
import { resourcesDetailsPage } from "../../../pages/resourcesdetailspage";

describe("To test delete resource functionality  ", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.manage().window().maximize();
    
    let resourceslistpageobj=new resourcesListPage();
    resourceslistpageobj.ClickOnAnyResource("development:1");
    browser.sleep(3000);
    
    });

   it("Verify if ‘Delete Resource’ option is present in the Actions dropdown",()=>{
      
      let resourcesdetailspageobj=new resourcesDetailsPage();
      
      resourcesdetailspageobj.clickOnActionsDropdown();
      browser.sleep(3000);
      resourcesdetailspageobj.checkForDisplayOfDeleteResourceOption();
       
       
    });

   it("Verify the display of Delete Resource overlay",()=>{
      
      let resourcesdetailspageobj=new resourcesDetailsPage();
      resourcesdetailspageobj.clickOnActionsDropdown();
      resourcesdetailspageobj.clickOnDeleteResourceOption();
      browser.sleep(3000);
      resourcesdetailspageobj.checkForTheDisplayOfDeleteResourceOverlay();
      
   });

   it("Verify that the user is navigated to Resources list page after deleting the resource",()=>{
    
    let resourcesdetailspageobj=new resourcesDetailsPage();
    resourcesdetailspageobj.clickOnActionsDropdown();
    resourcesdetailspageobj.clickOnDeleteResourceOption();
    resourcesdetailspageobj.confirmBtnOnDeleteResourceOverlay.click();
    browser.sleep(3000);
    let resourceslistpageobj=new resourcesListPage();
    resourceslistpageobj.resourcesPageHeader.isDisplayed();
   
 });
    

  
});