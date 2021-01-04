import { AppPage } from "../../pages/app.po";
import { element, by, browser } from "protractor";

describe("hx-Alert testing", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.ignoreSynchronization = true;
  });
  
   xit("Should check if testing hx-alert element is present", async () => {
      page.navigateTo();
      browser.sleep(2000); 
      page.baseElement.addResource.click();
      browser.sleep(1000);
      page.baseElement.resourceId.sendKeys("%%%");
      browser.sleep(1000);
      page.baseElement.addResource.click();
      browser.sleep(2000);
      expect(page.baseElement.eleSubmit.isPresent()).toBe(true);
   });

});