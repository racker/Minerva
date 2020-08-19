import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { browser, element, by } from "protractor";

describe("Create Monitor Label Selector fields Testing", () => {
  let page: AppPage;
  let nav: navigations;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    nav = new navigations();

  });
  it("Should check that when mouse focus is on the key text input a list of keys displays/ is present", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    element(by.id("txtKey-0")).click();
    browser.sleep(1000);
    expect(element.all(by.xpath("//datalist[@id='list-keys']//option")).isPresent()).toBe(true);
  })

  it("Should check that when mouse focus is on the value text input a list of values displays/ is present", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    element(by.id("txtValue-0")).click();
    expect(element.all(by.xpath("//datalist[@id='list-values']//option")).isPresent()).toBe(true);
  })
  it("Should checks that there is only one plus click button to the right of the set of the fields", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    var pluscount= element(by.xpath("//div[@class='hxRow hxSpan-10 nowrap ng-untouched ng-pristine ng-valid ng-star-inserted']//button[@class='hxBtn inline-button ng-star-inserted']"));
    let value1 = await pluscount.getAttribute("childElementCount");
    expect(value1).toEqual("1");
  })

  it("Should checks that clicking the add icon next to the label selector icon adds a set of key and value fields that also have lists associated.", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    var pluscount= element(by.xpath("//div[@class='hxRow hxSpan-10 nowrap ng-untouched ng-pristine ng-valid ng-star-inserted']//button[@class='hxBtn inline-button ng-star-inserted']")).click();
    expect(element(by.id("txtKey-1")).isEnabled()).toBe(true);
    expect(element(by.id("txtValue-1")).isEnabled()).toBe(true);
  })

  it("Should checks that clicking the remove icon removes a set of fields from the form.", async () => {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//button[@class='hxBtn hxPrimary']")).click();
    var pluscount= element(by.xpath("//div[@class='hxRow hxSpan-10 nowrap ng-untouched ng-pristine ng-valid ng-star-inserted']//button[@class='hxBtn inline-button ng-star-inserted']")).click();

    element.all(by.xpath("//button[@class='hxBtn space-right inline-button ng-star-inserted']")).get(1).click();
    var pluscount1= element(by.xpath("//div[@class='hxRow hxSpan-10 nowrap ng-untouched ng-pristine ng-valid ng-star-inserted']//button[@class='hxBtn inline-button ng-star-inserted']"));
    browser.sleep(1000);
    let value1 = await pluscount1.getAttribute("childElementCount");
    expect(value1).toEqual("1");

  })
});
