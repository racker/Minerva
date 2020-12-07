import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by } from "protractor";

describe("Editing of a monitor name and delete a monitor details", () => {
  let page: AppPage;
  let nav: navigations;
  let page1:MonitorsListPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
    browser.manage().window().maximize();
  });

  beforeEach(()=>{
    nav=new navigations();
    nav.navigateToMonitor();
    browser.sleep(5000);
    page1=new MonitorsListPage();
  });

  it("Should check the editing of a Monitor name is updated", async () => {
    page1.firstRecord.click();
    page1.updateMonNamePen.click();
    page1.renameMonitor.sendKeys("Chill");
    page1.renameMonitorSubmit.click();
    expect(page1.renameMonitorSubmit.isPresent()).toBe(true);
  });

  it("Should check that the user can delete the monitor detail", async () => {
    page1.firstRecord.click();
    page1.actionsButton.click();
    page1.deleteMonitor.click();
    browser.sleep(1000);
    let message = await page1.deleteMonitor.getAttribute("textContent");
    browser.sleep(1000);
    expect(message).toEqual("Delete Monitor");
  });
})