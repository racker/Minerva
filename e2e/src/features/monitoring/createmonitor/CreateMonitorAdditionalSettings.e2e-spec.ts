import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { CreateMonitorPage } from "../../../pages/createmonitorpage";
import { browser } from "protractor";



describe("To test Additional Settings functionality on Create Monitor page", () => {
    let page: AppPage;
    let nav: navigations;
    let newPage:CreateMonitorPage;
  
    beforeAll(() => {
      let page = new AppPage();
      page.navigateTo();
      nav = new navigations();
      nav.navigateToMonitor();
      browser.manage().window().maximize();
      
      let page1=new MonitorsListPage();
      page1.createMonitorBtn.click();
      browser.sleep(3000);
      newPage=new CreateMonitorPage();
      newPage.additionalSettingsLink.click();
      browser.sleep(3000);
    });


    it("To verify that form displays correct number of fields and labels",()=>{
        expect(newPage.periodLabel.isDisplayed()).toBe(true);
        expect(newPage.excludedResourcesLabel.isDisplayed()).toBe(true);
        expect(newPage.resourceIDLabel.isDisplayed()).toBe(true);
        expect(newPage.labelSelectorMethod.isDisplayed()).toBe(true);

    });

    it("To verify that Period fields allows only numbers",()=>{
     
        newPage.periodTxtBx.sendKeys('78');
        
    });

    it("To verify that plus icon for Excluded Resources adds new dropdown field",()=>{
     
        newPage.addNewExcludedResourcesDrpDwn();
        
    });

    it("To verify that minus icon for Excluded Resources removes existing dropdown field",()=>{
     
        newPage.removeExcludedResourcesDrpDwn();
        
    });


    it("To verify that label selector field displays dropdown and has two entries",()=>{
     
        newPage.labelSelectorMethodDrpDwn.click();
        newPage.checkTheEntriesOfLabelSelectorMethodDrpDwn();
        });

    it("To verify that Excluded Resources & Resource ID dropdowns both load with resource data",()=>{
          newPage.checkDrpDwnIsLoadedWIthResourceData('resource');

          newPage.checkDrpDwnIsLoadedWIthResourceData('resourceId');
    });

});