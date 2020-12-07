import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { browser, element,by} from "protractor";
import { ResourcesListPage } from "../../../pages/resourcelistpage";

describe("Add-fields Component Test in resources", () => {
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
    browser.sleep(5000);
    page1 = new ResourcesListPage();
  });

  it("Should check if a label is present", () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.nameLabel.isDisplayed();
    page1.updateLabelPen.click();
    expect(page1.updateLabelPen.isPresent()).toBe(true);
  });

  it("Should check if Testing if the label has add button", () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.updateLabelPen.click();
    browser.sleep(1000);
    page1.plusLabelValue.click();
    expect(page1.plusLabelValue.isPresent()).toBe(true);
  });

  it("Should check if clicking on add button multiple times the row should multiply", () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.updateLabelPen.click();
    browser.sleep(1000);
    page1.plusLabelValue.click();
    page1.plusLabelValue.click();
    page1.plusLabelValue.click();
    expect(page1.plusLabelValue.isPresent()).toBe(true);
  });

  it("Should check if click minus button should remove a row", () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.updateLabelPen.click();
    browser.sleep(1000);
    page1.minusLabelValue.click();
    browser.sleep(1000)
    expect(page1.minusLabelValue.isPresent()).toBe(false);
  });

  it("Should check if after clicking key button and initiating popover any key with agent_discovered should have disabled input fields for both key & value input boxes", async () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.updateLabelPen.click();
    browser.sleep(1000);
    page1.agentDiscover.click();
    browser.sleep(1000);
    expect(page1.agentDiscover.getAttribute('disabled')).toBe('true');
  });

  it("Should check if entering Agent_ into a key field should prompt validation message and is not allowed", () => {
    page1.secondRecord.click();
    browser.sleep(3000);
    page1.updateLabelPen.click();
    browser.sleep(1000);
    page1.keyLabel.sendKeys("agent_");
    browser.sleep(2000);
    var errMsg = page1.errAgentDiscover;
    page1.valueLabel.sendKeys("123");
    expect(errMsg.getText()).toEqual("'agent_' is a reserved phrase");
});

it("Should check if clicking cancel from within the popover should hide the popover", async () => {
  page1.secondRecord.click();
  browser.sleep(3000);
  page1.updateLabelPen.click();
  page1.cancelButton.click();
  browser.sleep(2000);
  var labelfalse = page1.updateLabelPen;
  let value1 = await labelfalse.getAttribute("ariaExpanded");
  expect(value1).toEqual("false");
});
})