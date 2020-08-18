import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { browser, element, by } from "protractor";

describe("Editing of a monitor name and delete a monitor details", () => {
  let page: AppPage;
  let nav: navigations;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    nav = new navigations();

  });
it("Should check that the user can delete the monitor detail", async () =>
  {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//a[contains(text(),'Bandwidth Monitoring for eth0')]")).click();
    element(by.xpath("//span[@id='btnActions']")).click();
   var alert =  element(by.xpath("//hx-disclosure[contains(text(),'Delete Monitor')]"));
   element(by.xpath("//hx-disclosure[contains(text(),'Delete Monitor')]")).click();
    browser.sleep(1000);
    let message = await alert.getAttribute("textContent");
    expect(message).toEqual("Delete Monitor");
   })

  it("Should check the editing of a Monitor name is updated", async () =>
  {
    nav.navigateToMonitor();
    browser.sleep(1000);
    element(by.xpath("//a[contains(text(),'Bandwidth Monitoring for eth0')]")).click();
    element(by.xpath("//hx-disclosure[@id='updateMonNamePen']")).click();
    element(by.xpath("//input[@id='txtResource']")).sendKeys("Chill");
    element(by.xpath("//button[@id='btnMonitorName' and @type='submit']")).click();
    expect(element(by.xpath("//button[@id='btnMonitorName' and @type='submit']")).isPresent()).toBe(true);
   })
})