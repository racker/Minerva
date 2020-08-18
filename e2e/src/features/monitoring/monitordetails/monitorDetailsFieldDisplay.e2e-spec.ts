import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorlistpage";
import { MonitorsDetailsPage } from "../../../pages/monitordetailspage";
import { browser } from "protractor";
import { default as using } from "jasmine-data-provider";
import { default as obj } from "../../../../../src/app/_mocks/monitors/single.json";

   
describe("To test fields display on Monitor's details page", ()=> {
   let page: AppPage;
   let nav: navigations;
   let page1: MonitorsListPage;
   let page2: MonitorsDetailsPage;

   beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
browser.manage().window().maximize();
   });

   beforeEach(() => {
      nav = new navigations();
      nav.navigateToMonitor();
      browser.sleep(5000);
      page1 = new MonitorsListPage();
      page1.monitorName().click();
      browser.sleep(5000);
      page2 = new MonitorsDetailsPage();

   });

   var labelKeys = Object.keys(obj.labelSelector);

   using([{ key: labelKeys[0], value: obj.labelSelector[labelKeys[0]]}, { key: labelKeys[1], value: obj.labelSelector[labelKeys[1]] },
      { key: labelKeys[2], value: obj.labelSelector[labelKeys[2]] }, { key: labelKeys[3], value: obj.labelSelector[labelKeys[3]] }], (data) => {

      it(`Verify that monitor details page displays ${data.key} label info`, () => {
         expect(page2.labelsInfoKeyDisplay(data.key).isDisplayed()).toBe(true);
         expect(page2.labelsInfoValueDisplay(data.value).isDisplayed()).toBe(true);
         browser.sleep(3000);
      });
   });


      it("Verify that additional settings slide down on clicking it and that the text appears in correct areas",()=>{
         page2.additionalSettingslink.click();
         browser.sleep(5000);
      // 1.Checking the display of excluded resources
         expect(page2.getExcludedResources(0)).toEqual(obj.excludedResourceIds[0]);
         expect(page2.getExcludedResources(1)).toEqual(obj.excludedResourceIds[1]);
         expect(page2.getExcludedResources(2)).toEqual(obj.excludedResourceIds[2]);
      // 2.Checking the display of Period
           expect(page2.getPeriod()).toEqual(obj.period);
      // 3.Checking the display of labelSelectorMethod
         expect(page2.getlabelSelectorMethod()).toEqual(obj.labelSelectorMethod)
      // 4.Checking the display of Policy
         expect(page2.getPolicy()).toEqual(obj.policy);
  
      });
   });



   

