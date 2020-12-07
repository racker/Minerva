import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by } from "protractor";

describe("Min Max Port field create monitor", () => {
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

  it("Testing when entered negative value check for validation message", ()=> {
    page1.createMonitor.click();
    page1.monitorTypeDrpDown.click();
    browser.sleep(1000);
    page1.valueNetResponse.click();
    page1.valueProtocol.sendKeys("-87644");
    browser.sleep(1000);
    var errMsg = page1.errorMsgProtocolValue;
    expect(errMsg.getText()).toEqual("The minimum value to accept for this input 1");    
    
  });


  it("Testing when entered greater then 65535 value check for validation message", () => {
    page1.createMonitor.click();
    page1.monitorTypeDrpDown.click();
    browser.sleep(1000);
    page1.valueNetResponse.click();
    page1.valueProtocol.sendKeys("98765");
    browser.sleep(1000);
    var errMsg = page1.errorMsgProtocolValue;
    expect(errMsg.getText()).toEqual("The maximum value to accept for this input 65535");
    
  });

  it("Testing the date time format for input fields should accept numeric value", () => {
    page1.createMonitor.click();
    page1.monitorTypeDrpDown.click();
    browser.sleep(1000);
    page1.valueNetResponse.click();
    page1.valueTimeout.sendKeys("80");
    page1.valueTimeout.sendKeys("%$#");
    element(by.xpath("//input[@placeholder='readTimeout']")).sendKeys("120");
    element(by.xpath("//input[@placeholder='readTimeout']")).sendKeys("*&^");
    page1.valueReadTimeout.sendKeys("120");
    page1.valueReadTimeout.sendKeys("*&^");
    expect(page1.msgTimeout.isPresent()).toBe(true);
    expect(page1.msgReadTimeout.isPresent()).toBe(true);
  });
});