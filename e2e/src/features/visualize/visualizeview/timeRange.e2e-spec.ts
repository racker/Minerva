import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { VisualizeViewPage } from "../../../pages/visualizeViewPage";
import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";
import { url } from "inspector";



describe("To test time range view on Visualize page", () => {
    let page : AppPage;
    let nav  : navigations;
    let page1:VisualizeViewPage;
    // let dateOne = page1.getDate(startDate);
    // let dateTwo = page1.getDate(endDate);
    // let time = '1HR';
    // let url = browser.getCurrentUrl();


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

    fit("Should check the presets and customs time range", async () => {
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
        browser.sleep(2000);
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

        var startDate = page1.startDate.getAttribute('ng-reflect-model');
        var endDate = page1.endDate.getAttribute('ng-reflect-model');
        console.log("timeRange", startDate);


        let dateOne = page1.getDate(startDate);
        console.log("dateOne", dateOne);
        let dateTwo = page1.getDate(endDate);
        let time = '1HR';

        let url = browser.getCurrentUrl();

        expect(url).toContain(`https://dev.i.rax.io:4200/intelligence/visualize?duration=${time}`);
            
        //https://dev.i.rax.io:4200/intelligence/visualize?duration=1HR&start=2021-06-15T10:40.000Z&end=2021-06-16T10:40:25.000Z
        expect(url).toContain('&start=' +dateOne + 'T03:31');
        expect(url).toContain('&end=' +dateTwo + 'T05:43');

        
        //let preset = '1HR';
        //expect(url).toContain(`https://dev.i.rax.io:4200/intelligence/visualize?duration=${preset}`);
        //expect(browser.getCurrentUrl()).toContain(browser.params.baseUrl + "intelligence" + "visualize" + "?" + )
        browser.getCurrentUrl().then((a)=>{console.log("url:",a)})

        //browser.params.baseUrl;

        //expect(browser.getCurrentUrl()).toMatch(browser.params.baseUrl + "")
 
        // var dateobj = new Date('Jun 15, 2021, 3:31:50 AM');
        // var dateobj3 = new Date('Jun 15, 2021, 3:31 AM');
        // var B = dateobj.toISOString();
        // var B1 = dateobj3.toISOString();
        // console.log(B);
        // console.log(B1);

        // var dateobj1 = new Date('Jul 24, 2021, 5:43 PM');
        // var B1 = dateobj1.toISOString();
        // console.log(B1);

        

    });
});
