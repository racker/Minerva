import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { monitorsListPage } from "../../../pages/monitorlistpage";
import { monitorsDetailsPage } from "../../../pages/monitordetailspage";
import { browser } from "protractor";
import { default as using } from "jasmine-data-provider";
import { default as obj } from "../../../../../src/app/_mocks/monitors/single.json";

   
describe("To test fields display on Monitor's details page", ()=> {
   let page: AppPage;
   let nav: navigations;
   let page1: monitorsListPage;
   let page2: monitorsDetailsPage;

   beforeAll(() => {
      page = new AppPage();
      page.navigateTo();

   });

   beforeEach(() => {
      nav = new navigations();
      nav.navigateToMonitor();
      browser.sleep(5000);
      page1 = new monitorsListPage();
      page1.monitorName().click();
      browser.sleep(5000);
      page2 = new monitorsDetailsPage();

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
         page2.additionalSettings.click();
         
         expect(obj["period(seconds)"]).toEqual(66);
         
         expect(obj.excludedResourceIds[0]).toEqual('development:5')
         expect(obj.excludedResourceIds[1]).toEqual('development:6')
         expect(obj.excludedResourceIds[2]).toEqual('development:7')

         // expect(obj.resourceId).toEqual('development:2');
         
         expect(obj.policy).toBeFalsy;

         expect(obj.labelSelectorMethod).toEqual('AND');

      });
   });



   

