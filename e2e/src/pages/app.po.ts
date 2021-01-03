import { browser, by, element } from "protractor";

export class AppPage {
  baseElement = {
    router: element(by.css("app-root router-outlet")),
    firstResource: element(by.xpath("//tr[1]//td[2]//a[1]")),
    breadcrumb: element(by.xpath("//nav[@class='hxBreadcrumb']")),
    resourcesBreadcrumb: element(by.xpath("//a[@class='active']")),
    headerResource: element(by.xpath("//h2[contains(text(),'Resources')]")),
    listResource: element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]")),
    nextPageArrow: element(by.xpath("//button[@class='hxBtn nextPage']")),
    nextPageResourceRecord: element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]")),
    thirdPageArrow: element(by.xpath("//button[contains(text(),'3')]")),
    PageResourceRecord: element.all(by.xpath("//table[@class='hxTable']//tbody//tr//td[2]")),
    lastPageArrow: element(by.xpath("//button[@class='hxBtn lastPage']")),
    resourceRow: element.all(by.xpath("//table[@class='hxTable']//tbody//tr")),
    firstPageButton: element.all(by.xpath("//button[contains(text(),'1')]")),
    initialPageArrow: element(by.xpath("//button[@class='hxBtn firstPage']")),
    secondPageButton: element(by.xpath("//button[contains(text(),'2')]")),
    thirdPageButton: element(by.xpath("//button[contains(text(),'3')]")),
    prevPage: element(by.xpath("//button[@class='hxBtn prevPage']")),
    addResource: element(by.xpath("//hx-disclosure[@id='addResButton']")),
    resourceId: element(by.xpath("//input[@id='txtResource']")),
    addResSubmit: element(by.xpath("//button[@class='hxBtn hxPrimary']")),
    eleSubmit: element(by.tagName("hx-alert")),
  };

  navigateTo() {
    return browser.get(browser.baseUrl);
  }
  

  getRouter() {
    return this.baseElement.router;
  }

  getHelixNavCssClass() {
    return element(by.id("nav")).getAttribute("class");
  } 


}
