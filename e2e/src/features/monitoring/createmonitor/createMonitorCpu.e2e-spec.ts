import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by } from "protractor";

describe("Create Monitor Label Selector fields Testing", () => {
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

  it("Should check that when mouse focus is on the key text input a list of keys displays/ is present", async () => {
    page1.createMonitor.click();
    page1.keyDrpDown.click();
    browser.sleep(1000);
    expect(page1.keyListOptions.isPresent()).toBe(true);
  })

  it("Should check that when mouse focus is on the value text input a list of values displays/ is present", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    page1.createMonitor.click();
    page1.keyDrpDown.click();
    expect(page1.keyListOptions.isPresent()).toBe(true);
  })

  it("Should checks that there is only one plus click button to the right of the set of the fields", async () => {
    page1.createMonitor.click();
    var pluscount = page1.plusValue;
    let value1 = await pluscount.getAttribute("childElementCount");
    expect(value1).toEqual("1");
  })

  it("Should checks that clicking the add icon next to the label selector icon adds a set of key and value fields that also have lists associated.", async () => {
    page1.createMonitor.click();
    page1.plusValue.click();
    expect(page1.keyValue1.isPresent()).toBe(true);
    expect(page1.keyValue2.isPresent()).toBe(true);
  })

  it("Should checks that clicking the remove icon removes a set of fields from the form.", async () => {
    page1.createMonitor.click();
    page1.plusValue.click();
    page1.minusValue.get(1).click();
    var pluscount1= page1.plusValue;
    browser.sleep(1000);
    let value1 = await pluscount1.getAttribute("childElementCount");
    expect(value1).toEqual("1");

  })
});
