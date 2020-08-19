import { navigations } from "../../../commons/navigations";
import { browser, element, by } from "protractor";
import { AppPage } from "../../../pages/app.po";




describe("Monitor List", () => {
        let page: AppPage;
        let nav: navigations;
  

  beforeEach(() => {
    page = new AppPage();
    nav = new navigations();
    page.navigateTo();
   
    
  });
  var strxpath = "//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox";

  it("Check if checkbox is present" , () => {
     nav.navigateToMonitor(); 
    
    expect(element(by.xpath(strxpath)).isPresent());

  });

  it("Check if Create Suppression button is enabled" , () => {
     nav.navigateToMonitor();
    browser.sleep(1000);
    element.all(by.xpath(strxpath)).click();
    browser.sleep(1000);
    expect(element(by.xpath("//button[contains(text(),'Create Suppression')]")).isEnabled()).toBe(true);
  });
  
  it("Check if Copy Monitor button is enabled" , () => {
     nav.navigateToMonitor();
    browser.sleep(1000);
    element.all(by.xpath(strxpath)).click();
    browser.sleep(10000);
    expect(element(by.xpath("//button[contains(text(),'Copy Monitor')]")).isEnabled()).toBe(true);
  });
  it("Check if Create Monitor button is present" , () => {
     nav.navigateToMonitor();
    browser.sleep(5000);
    expect(element(by.xpath("//button[@class='hxBtn hxPrimary']")).isPresent()).toBe(true);
  });
  it("Check few checkbox selected and deseleted if all buttons are enabled" , () => {
     nav.navigateToMonitor(); 
    browser.sleep(1000);
  element(by.xpath(strxpath)).click();
  element(by.xpath("//tr[3]//td[1]//hx-checkbox-control[1]//label[1]//hx-checkbox[1]")).click();
  element(by.xpath("//tr[2]//td[1]")).click();
  browser.sleep(1000);
  expect(element(by.xpath("//button[contains(text(),'Create Suppression')]")).isEnabled()).toBe(true);
  browser.sleep(1000);
  expect(element(by.xpath("//button[contains(text(),'Copy Monitor')]")).isEnabled()).toBe(true);

  });
  
  it("Should have search option", ()=>{
     nav.navigateToMonitor();
    browser.sleep(1000);
    expect(element(by.xpath("//input[@id='txtSearch']")).isPresent()).toBe(true);
 });
 it("should display 25 rows", async()=>
{  
    await nav.navigateToMonitor();
    browser.sleep(3000);
    var arrRows =  element(by.css("table.hxTable tbody")).all(by.tagName("tr"));
    var rowsarr = await arrRows.getAttribute("childElementCount");
    expect(rowsarr.length).toEqual(25);
});

it("Should display 5 columns ", async()=>
{
    await nav.navigateToMonitor();
    browser.sleep(2000);
  var path =  element.all(by.xpath("//tbody//tr[2]//td"));
  var colNum = await path.getAttribute("childElementCount");
  expect(colNum.length).toEqual(5);
});


})