import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { browser, element, by } from "protractor";
import { ResourcesListPage } from "../../../pages/resourcelistpage";
import { DeleteSelectedResourceOverlay } from "../../../overlays/deleteSelectedResourceOverlay";

describe("Resources List", () => {
  let page: AppPage;
  let nav  : navigations;
  let page1: ResourcesListPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
    browser.manage().window().maximize();
 });
 
  beforeEach(() => {
    nav = new navigations();
    nav.navigateToResources();
    browser.sleep(3000);
    page1 = new ResourcesListPage();
  });

  it("check if Create Muiltiple Monitores button is enabled", () => {
    page1.resHeaderCheckbox.click();
    browser.sleep(1000);
    expect(page1.createMultipleMonitors.isEnabled()).toBe(true);
  });

  it("Check if check box is enabled" , () => {
    expect(page1.resHeaderCheckbox.isPresent());
  });

  it("Check if Delete button is enabled" , () => {
    page1.resHeaderCheckbox.click();
    browser.sleep(1000);
    expect(page1.deleteBtn.isEnabled()).toBe(true);
  });

  it("check if Create Supression button is enabled",  () => {
    page1.resHeaderCheckbox.click();
    browser.sleep(1000);
    expect(page1.createSuppression.isEnabled()).toBe(true);
  });

  it("should have Add resources button", () => {
    expect(page1.addResourceBtn.isEnabled()).toBe(true);
  });

  it("Once add resources should have Submit button enabled", ()=>{
    page1.addResourceBtn.click();
    expect(page1.submitAddResource.isEnabled()).toBe(true);
  });

  it("Once Add resources button is clicked cancel button should be enabled", ()=>{
    page1.addResourceBtn.click();
    expect(page1.cancelAddResource.isEnabled()).toBe(true);
  });

  it("Add Resources button clicked should have text box",()=>{
    page1.addResourceBtn.click();
    expect(page1.textAddResource.isPresent()).toBe(true);
  });

  it("Should have enabled Presence Monitor checkbox", ()=>{
    page1.addResourceBtn.click();
    expect(page1.enablePresenceMon.isPresent()).toBe(true);
  });

  it("Should have search option", ()=>{
   expect(page1.textSearch.isPresent()).toBe(true);
  });

  it("should display 25 rows", async()=> {
    let overlay=new DeleteSelectedResourceOverlay();
    var arrRows = await overlay.resRowPath.getAttribute("childElementCount");
    expect(arrRows.length).toEqual(25);
  });

  it("Should display 7 columns ", async()=> {
    var path = page1.resColPath;
    var colNum = await path.getAttribute("childElementCount");
    expect(colNum.length).toEqual(7);
  });
})