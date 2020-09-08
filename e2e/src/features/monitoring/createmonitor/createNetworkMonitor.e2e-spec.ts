import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { CreateMonitorPage } from "../../../pages/createmonitorpage";
import { browser } from "protractor";
import { default as using } from "jasmine-data-provider";
import { default as obj } from "../../../../Objects.json";


describe("To test Create Monitor functionality", () => {
    let page: AppPage;
    let nav: navigations;
  
    beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
      nav = new navigations();
      nav.navigateToMonitor();
      browser.manage().window().maximize();
  
    });
    
    using([{monitorType:obj.monitordetails.monitorType1 ,monitorName:obj.monitordetails.monitorName1, key:obj.monitordetails.key1,value:obj.monitordetails.value1},{monitorType:obj.monitordetails.monitorType2 ,monitorName:obj.monitordetails.monitorName2,key:obj.monitordetails.key2,value:obj.monitordetails.value2}],(data)=>{

      it(`Verify that user must be navigated to Monitoring on creating ${data.monitorType} monitor`, () => {
      
        let page=new MonitorsListPage();
        page.createMonitorBtn.click();
        browser.sleep(3000);
        
        let newPage=new CreateMonitorPage();
        newPage.selectLocalMonitorType(data.monitorType);
        browser.sleep(3000);
        newPage.enterMonitorName(data.monitorName);
        browser.sleep(3000);
        newPage.selectKeyFromDropdown(data.key);
        browser.sleep(5000);
        newPage.selectValueFromDropdown(data.value);
        browser.sleep(5000);
        newPage.submitBtn.click();
        
        browser.sleep(5000);
        let backtomonitorListPage=new MonitorsListPage();
        expect(backtomonitorListPage.pageTitle.getText()).toEqual('Monitors');
  
      });

    });
  });
   
   


  