
import { browser, element, by } from "protractor";
import { AppPage } from "../../pages/app.po";

describe("Breadcrumb testing in resources", () => {
  let page: AppPage;
  

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    
  });

it("Should check breadcrumb is present ",async()=>{
   page.baseElement.firstResource.click();
   var msg = page.baseElement.breadcrumb;
   var Atribute = await msg.getAttribute("className");
   expect(Atribute).toEqual("hxBreadcrumb");

  });
  

it("Should check breadcrumb link is navigating" ,()=>{
  page.baseElement.firstResource.click();
   var path = page.baseElement.breadcrumb;
  expect(path.getText()).toEqual("RESOURCES\ndevelopment:0");
});

it("Should check breadcrumb link is navigating and then back to rescources" ,()=>{
  page.baseElement.firstResource.click();
  page.baseElement.resourcesBreadcrumb.click();
  expect(page.baseElement.headerResource.isPresent()).toBe(true);
});

it("Should check if href is present is 1st page" ,async() =>{
   var path = page.baseElement.listResource;
   var colNum = await path.getAttribute("href");
   expect(colNum.length).toEqual(25);    
});

it("Should check if href is present is 2nd page" , async() =>{
  page.baseElement.nextPageArrow.click();
  var path = page.baseElement.nextPageResourceRecord;
  var colNum = await path.getAttribute("href");
  expect(colNum.length).toEqual(25);
});

it("Should check if href is present is 3rd page" , async() =>{
  page.baseElement.thirdPageArrow.click();
  var path = page.baseElement.PageResourceRecord;
  var colNum = await path.getAttribute("href");
  expect(colNum.length).toEqual(4);
});
});
