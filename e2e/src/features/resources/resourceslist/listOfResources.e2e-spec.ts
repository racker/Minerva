
import { browser, element, by } from "protractor";
import { AppPage } from "../../../pages/app.po";



describe("Resources List", () => {
    let page: AppPage;
  

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.sleep(3000);
  });

  it("Check if check box is enabled" , () => {
    
    expect(element(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).isPresent());
  });

  it("Check if Delete button is enabled" , () => {
    
    element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
    browser.sleep(1000);
    expect(element(by.xpath("//hx-disclosure[contains(text(),'Delete')]")).isEnabled()).toBe(true);
  });

  it("check if Create Muiltiple Monitores button is enabled", () => {
    
    
        element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
        browser.sleep(1000);
        expect(element(by.xpath("//button[contains(text(),'Create Multiple Monitors')]")).isEnabled()).toBe(true);
       
  });

  it("check if Create Supression button is enabled",  () => {
    
   element.all(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox")).click();
    browser.sleep(1000);
    expect(element(by.xpath("//button[contains(text(),'Create Suppression')]")).isEnabled()).toBe(true);
  });
 it("should have Add resources button", () => {
   
  expect(element(by.xpath("//hx-disclosure[@id='addResButton']")).isEnabled()).toBe(true);

 });
 it("Once add resources should have Submit button enabled", ()=>{
   element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//button[@class='hxBtn hxPrimary']")).isEnabled()).toBe(true);

 });
 it("Once Add resources button is clicked cancel button should be enabled", ()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//button[contains(text(),'Cancel')]")).isEnabled()).toBe(true);
  
 });
 it("Add Resources button clicked should have text box",()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  expect(element(by.xpath("//input[@id='txtResource']")).isPresent()).toBe(true);
 });
 it("Should have enabled Presence Monitor checkbox", ()=>{
  element(by.xpath("//hx-disclosure[@id='addResButton']")).click();
  
  expect(element(by.xpath("//label[contains(text(),'Enable Presence Monitoring')]")).isPresent()).toBe(true);
 });
 it("Should have search option", ()=>{
   expect(element(by.xpath("//input[@id='txtSearch']")).isPresent()).toBe(true);
});

it("should display 25 rows", async()=>
{
    var arrRows = await element(by.css("table.hxTable tbody")).all(by.tagName("tr"));
    expect(arrRows.length).toEqual(25);
});

it("Should display 7 columns ", async()=>
{
  var path =  element.all(by.xpath("//tbody//tr[2]//td"));
  var colNum = await path.getAttribute("childElementCount");
  expect(colNum.length).toEqual(7);
});
   

})