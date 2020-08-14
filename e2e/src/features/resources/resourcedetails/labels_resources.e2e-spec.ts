import { AppPage } from "../../../pages/app.po";
import { element, by, browser, Browser } from "protractor";

describe("Add-fields Component Test in resources", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.ignoreSynchronization = true;
    page.navigateTo();
    element(by.xpath("//tr[2]//td[2]//a[1]")).click();
  });

  it("Should check if a label is present", () => {
    element(by.xpath("//h4[contains(text(),'Labels')]")).click();
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    expect(element(by.xpath("//hx-disclosure[@id='labelpop']")).isPresent()).toBe(true);
  });

  it("Should check if Testing if the label has add button", () => {
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    browser.sleep(1000);
    element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']")).click(); 
    expect(element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']")).isPresent()).toBe(true);
  });

  it("Should check if click add button should add 2twice row should update", () => {
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']")).click();
    element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']")).click();    
    expect(element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']")).isPresent()).toBe(true);
  });

  it("Should check if click minus button should remove a row", () => {
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    browser.sleep(1000);
    element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//button[1]")).click();
    browser.sleep(1000)
    expect(element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//button[1]")).isPresent()).toBe(false);
  });

  it("Should check if after clicking key button and initiating popover any key with agent_discovered should have disabled input fields for both key & value input boxes", async () => {
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    browser.sleep(3000);
    var agent_discover = element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[@class='hxCol hxSpan-6']//div//div[1]//div[1]//hx-text-control[1]//input[1]")).click();
    browser.sleep(1000);
    expect(element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[@class='hxCol hxSpan-6']//div//div[1]//div[1]//hx-text-control[1]//input[1]")).getAttribute('disabled')).toBe('true');
  });

  it("Should check if entering Agent_ into a key field should prompt validation message and is not allowed", () => {
    element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
    element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//div[1]//hx-text-control[1]//input[1]")).sendKeys("agent_");
    browser.sleep(2000);
    var errMsg=element(by.xpath("//span[@class='required']"));
    element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//div[2]//hx-text-control[1]//input[1]")).sendKeys("123");
    expect(errMsg.getText()).toEqual("'agent_' is a reserved phrase");   
});

it("Should check if clicking cancel from within the popover should hide the popover", async () => {
  element(by.xpath("//hx-disclosure[@id='labelpop']")).click();
  element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn'][contains(text(),'Cancel')]")).click();
  browser.sleep(2000);
  var labelfalse =  element(by.xpath("//hx-disclosure[@id='labelpop']"));
  let value1 = await labelfalse.getAttribute("ariaExpanded");
  expect(value1).toEqual("false");
});
})