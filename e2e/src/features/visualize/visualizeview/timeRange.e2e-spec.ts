import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { VisualizeViewPage } from "../../../pages/visualizeViewPage";
import { browser, element, by } from "protractor";

describe("To test time range view on Visualize page", () => {
    let page : AppPage;
    let nav  : navigations;
    let page1:VisualizeViewPage;
    
    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();;
        browser.manage().window().maximize();
    });
    
    beforeEach(()=>{
        nav = new navigations();
        nav.navigateToVisualize();
        browser.sleep(1000);
        page1=new VisualizeViewPage();
    });

    it("Should check the presets and customs time range", async () => {
        page1.customButton.click();
        page1.presetButton.click();
        page1.oneHRButton.click();
        page1.customButton.click();
        page1.startDate.click();
        page1.monthDropdown.click();
        page1.yearButton.click();
        page1.juneMonth.click();
        page1.startCalendarDate.click();
        page1.startTimeHR.clear();
        page1.startTimeHR.sendKeys("03");
        page1.startTimeMIN.clear();
        page1.startTimeMIN.sendKeys("31");
        page1.amButtonPress.click();
        browser.sleep(1000);
        page1.setButton.click();
        browser.sleep(1000);
        page1.endDate.click();
        page1.monthDropdown.click();
        page1.yearButton.click();
        page1.julyMonth.click();
        page1.endCalendarDate.click();
        page1.startTimeHR.clear();
        page1.startTimeHR.sendKeys("05");
        page1.startTimeMIN.clear();
        page1.startTimeMIN.sendKeys("43");
        page1.setButton.click();
        page1.applyButton.click();
        browser.sleep(1000);

        let time = '1HR';
        let url = browser.getCurrentUrl();
        expect(url).toContain(`https://dev.i.rax.io:4200/intelligence/visualize?duration=${time}`);
        expect(url).toContain('&start=2021-06-14T22:01');
        expect(url).toContain('&end=2021-07-24T12:13');
    });
});
