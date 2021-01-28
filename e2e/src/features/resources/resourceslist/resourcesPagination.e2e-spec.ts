import { AppPage } from "../../../pages/app.po"
import { navigations } from "../../../commons/navigations";
import { ResourcesListPage } from "../../../pages/resourcelistpage";;
import { browser, element, by} from "protractor";

describe("Pagination Test in resources", () => {
        let page: AppPage;
        

  beforeEach(() => {
    page = new AppPage();
    
    page.navigateTo();
   
    
  });

  it("Should check if lastPage button is navigating", ()=>
  {
    page.baseElement.lastPageArrow.click();
    page.baseElement.resourceRow.then(function(Rows3)
  {
    var r3=Rows3.length;
    expect(r3).toEqual(4);
})

  });  

  it("Should check if firstpage button is navigating", async()=>
  {
    page.baseElement.firstPageButton.click();
    page.baseElement.initialPageArrow.click();

    var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));

    var size = (await page1).length;
    expect(size).toEqual(25);
   
  });  

  it("Should check if nextpage button is navigating", ()=>
  {
    page.baseElement.secondPageButton.click();
    page.baseElement.nextPageArrow.click();
    expect(page.baseElement.nextPageArrow.isPresent()).toBe(true);

  });  

  it("Should check if previous-page button is navigating", ()=>
  {
    page.baseElement.thirdPageButton.click();
    element(by.xpath("//button[@class='hxBtn prevPage']")).click();
    page.baseElement.prevPage.click();
    expect(page.baseElement.prevPage.isPresent()).toBe(true);
  });  

it("Should Populate first page", async()=>
{
  page.baseElement.firstPageButton.click();
  var path = page.baseElement.resourceRow;

    var size = (await path).length;
    expect(size).toEqual(25);
});

it("Should Populate second page", async()=>
{
  page.baseElement.secondPageButton.click();
  var path = page.baseElement.resourceRow;
  browser.sleep(1000);
    var size = (await path).length;
    expect(size).toEqual(25);
});

it("Should Populate third page", ()=>
{
  page.baseElement.thirdPageButton.click();
  page.baseElement.resourceRow.then(function(Rows3)
  {
    var r3=Rows3.length;
    expect(r3).toEqual(4);
})
});



it("Should check if first page button is disabled on initial load",()=>
{

expect(page.baseElement.initialPageArrow.isEnabled()).toBe(false);
});

it("Should check if previous page button is disabled on initial load",()=>
{

expect(page.baseElement.prevPage.isEnabled()).toBe(false);
});

it("Should check if last page button is enabled on initial load",()=>
{

expect(page.baseElement.lastPageArrow.isEnabled()).toBe(true);

});

it("Should check if next page button is enabled on initial load",()=>
{

expect(page.baseElement.nextPageArrow.isEnabled()).toBe(true);
});

it("Should check if last-page button is disabled on navigating to last page",()=>
{
  page.baseElement.lastPageArrow.click();
  expect(page.baseElement.lastPageArrow.isEnabled()).toBe(false);
});

it("Should check if next-page button is disabled on navigating to last page",()=>
{
  page.baseElement.lastPageArrow.click();
  expect(page.baseElement.nextPageArrow.isEnabled()).toBe(false);
});

it("Should check if first-page button is enabled on navigating to last page",()=>
{
  page.baseElement.lastPageArrow.click();
  expect(page.baseElement.initialPageArrow.isEnabled()).toBe(true);
});

it("Should check if previous-page button is enabled on navigating to last page",()=>
{
  page.baseElement.lastPageArrow.click();
  expect(page.baseElement.prevPage.isEnabled()).toBe(true);
});

})
