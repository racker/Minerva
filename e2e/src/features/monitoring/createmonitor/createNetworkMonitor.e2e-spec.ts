import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorlistpage";
import { CreateMonitorPage } from "../../../pages/createmonitorpage";
import { browser } from "protractor";

describe("To test Network Monitor creation", () => {
    let page: AppPage;
    let nav: navigations;
  
    beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
      nav = new navigations();
      nav.navigateToMonitor();
      browser.manage().window().maximize();
  
    });
    
    it("Verify that user must be navigated to Monitoring on creating network monitor", () => {
      
      let page=new MonitorsListPage();
      page.createMonitorBtn.click();
      browser.sleep(3000);
      
      let newPage=new CreateMonitorPage();
      newPage.selectLocalMonitorType("Net");
      browser.sleep(3000);
      newPage.enterMonitorName();
      browser.sleep(3000);
      newPage.selectKeyFromDropdown();
      browser.sleep(5000);
      newPage.selectValueFromDropdown();
      browser.sleep(5000);
      newPage.submitBtn.click();
      
      browser.sleep(5000);
      let backtomonitorListPage=new MonitorsListPage();
      expect(backtomonitorListPage.pageTitle.getText()).toEqual('Monitors');

    });

});
  