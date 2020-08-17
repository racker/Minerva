import { AppPage } from "../../../pages/app.po";
import { element, by, browser, Browser } from "protractor";
import { resourcesListPage } from "../../../pages/resourcelistpage";
import { resourcesDetailsPage } from "../../../pages/resourcesdetailspage";
import { metadataOverlay } from "../../../overlays/metadataOverlay";

describe("To test delete resource functionality  ", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.manage().window().maximize();
    
    let resourceslistpageobj=new resourcesListPage();
    resourceslistpageobj.ClickOnAnyResource("development:1");
    browser.sleep(3000);

    let resourcesdetailspageobj=new resourcesDetailsPage();
    resourcesdetailspageobj.clickOnMetadataPencil();
    browser.sleep(3000);
    
    });

   it("Verify that the metadata pencil icon initiates popover",()=>{
      
      let resourcesdetailspageobj=new resourcesDetailsPage();
      resourcesdetailspageobj.checkForTheDisplayOfMetaPopover();

      });

   it("Verify that metadata text appears in the input fields",async()=>{
      
      let metadataOverlayObj=new metadataOverlay();
      metadataOverlayObj.metadataKeyInputField.sendKeys("Key_ip");
      metadataOverlayObj.metadataValueInputField.sendKeys("129.0.0.1");
      browser.sleep(3000);
      
   });

   it("Verify that plus icon adds a new field set",()=>{
      let metadataOverlayObj=new metadataOverlay();
      metadataOverlayObj.addsNewFieldSet();
   
 });
    
   it("Verify that minus icon removes an existing field set",()=>{
      
      let metadataOverlayObj=new metadataOverlay();
      metadataOverlayObj.removesExistingFieldSet();
   
});

 
   it("Verify that cancel button removes popover",()=>{
      
      let metadataOverlayObj=new metadataOverlay();
      metadataOverlayObj.cancelBtnRemovesPopover();

   
});
  
});