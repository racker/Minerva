import { AppPage } from "../../../pages/app.po";
import { element, by, browser, Browser } from "protractor";
import { ResourcesListPage } from "../../../pages/resourcelistpage";
import { ResourcesDetailsPage } from "../../../pages/resourcesdetailspage";
import { MetadataOverlay } from "../../../overlays/metadataOverlay";

describe("To test metadata popover functionality  ", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.manage().window().maximize();
    
    let resourceslistpageobj=new ResourcesListPage();
    resourceslistpageobj.ClickOnAnyResource("development:1");
    browser.sleep(3000);

    let resourcesdetailspageobj=new ResourcesDetailsPage();
    resourcesdetailspageobj.clickOnMetadataPencil();
    browser.sleep(3000);
    
    });

   it("Verify that the metadata pencil icon initiates popover",()=>{
      
      let resourcesdetailspageobj=new ResourcesDetailsPage();
      resourcesdetailspageobj.checkForTheDisplayOfMetaPopover();

      });

   it("Verify that metadata text appears in the input fields",async()=>{
      
      let metadataOverlayObj=new MetadataOverlay();
      metadataOverlayObj.metadataKeyInputField.sendKeys("Key_ip");
      metadataOverlayObj.metadataValueInputField.sendKeys("129.0.0.1");
      browser.sleep(3000);
      
   });

   it("Verify that plus icon adds a new field set",()=>{
      let metadataOverlayObj=new MetadataOverlay();
      metadataOverlayObj.addsNewFieldSet();
   
 });
    
   it("Verify that minus icon removes an existing field set",()=>{
      
      let metadataOverlayObj=new MetadataOverlay();
      metadataOverlayObj.removesExistingFieldSet();
   
});

 
   it("Verify that cancel button removes popover",()=>{
      
      let metadataOverlayObj=new MetadataOverlay();
      metadataOverlayObj.cancelBtnRemovesPopover();
   });
  
});
