import { navigations } from "../../../commons/navigations";
import { browser, element, by } from "protractor";
import { AppPage } from "../../../pages/app.po";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { DeleteSelectedMonitorOverlay } from "../../../overlays/deleteSelectedMonitorOverlay";

describe("Monitor List", () => {
    let page: AppPage;
    let nav: navigations;
    let page1: MonitorsListPage;

    beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
      browser.manage().window().maximize();
    });

    beforeEach(() => {
      nav = new navigations();
      nav.navigateToMonitor();
      browser.sleep(5000);
      page1 = new MonitorsListPage();
    });

  it("Check if checkbox is present" , () => {
    expect(page1.headerCheckBox.isPresent());
  });

  /*
    TODO: Add again once development on these features are finalized with product leadership
          src/app/_features/monitors/components/list/monitorslist.component.html
  it("Check if Create Suppression button is enabled" , () => {
    page1.headerCheckBox.click();
    browser.sleep(1000);
    expect(page1.createSuppression.isEnabled()).toBe(true);
  });

  it("Check if Create Monitor button is present",() => {
    expect(page1.copyMonitor.isPresent()).toBe(true);
  });

  it("Check few checkbox selected and deseleted if all buttons are enabled",() => {
    page1.headerCheckBox.click();
    browser.sleep(1000);
    page1.uncheckCheckbox1.click();
    page1.uncheckCheckbox2.click();
    browser.sleep(1000);
    expect(page1.createSuppression.isEnabled()).toBe(true);
    browser.sleep(1000);
    expect(page1.copyMonitor.isEnabled()).toBe(true);
  });
   */

  it("Should have search option",()=> {
    browser.sleep(1000);
    expect(page1.searchTextBox.isEnabled()).toBe(true);
 });

  it("should display 25 rows", async()=> {
    let overlay=new DeleteSelectedMonitorOverlay();
    var rowsarr = await overlay.rowPath.getAttribute("childElementCount");
    expect(rowsarr.length).toEqual(25);
});

it("Should display 5 columns ", async()=> {
  var path =  page1.colPath;
  var colNum = await path.getAttribute("childElementCount");
  expect(colNum.length).toEqual(5);
});

it("Check if Copy Monitor button is enabled" , () => {
  page1.headerCheckBox.click();
  browser.sleep(1000);
  expect(page1.copyMonitor.isEnabled()).toBe(true);
});


})