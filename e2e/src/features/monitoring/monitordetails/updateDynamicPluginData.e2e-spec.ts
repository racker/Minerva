import { AppPage } from "../../../pages/app.po";
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { MonitorsDetailsPage } from "../../../pages/monitorDetailsPage";
import { browser, Key, element, by } from "protractor";
import { UpdatePluginDataOverlay } from "../../../overlays/updateplugindataOverlay";
import { protractor } from "protractor/built/ptor";

describe("Test to update dynamic plugin data", ()=> {
    let page : AppPage;
    let nav  : navigations;
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
       browser.sleep(2000);
       page1 = new MonitorsListPage();
       page1.monitorName().click();
       page2 = new MonitorsDetailsPage();
 
    });

    it("Verify that popover is displayed on clicking on pencil icon",()=>{
        page2.updatePluginDataPencilIcon.click();
        expect(page2.dynamicPluginDataPopover.isDisplayed()).toBe(true);

    });

    it("Verify that popover disappears on clicking on cancel button",()=>{
        page2.updatePluginDataPencilIcon.click();
        browser.executeScript('window.scrollTo(0,500);').then(()=>{
            browser.sleep(3000);
            let overlay=new UpdatePluginDataOverlay();
            overlay.cancelBtn.get(2).click();
        });
        expect(page2.monitorTypeMonitorDetails.getText()).toEqual("net_response monitor Details");
        

    });

    it("Verify that protocol field is required",()=>{

        page2.updatePluginDataPencilIcon.click();
        browser.executeScript('window.scrollTo(0,500);');
        browser.sleep(3000);
        
        let overlay=new UpdatePluginDataOverlay();
        overlay.selectAnOptionFromProtocolDropdown();
        
        element(by.tagName("hx-select")).getCssValue('border').then((color)=>{
            console.log(color);
            expect(color).toEqual('2px solid rgb(211, 47, 47)');
        })

        
    })

    it("Verify that host field is required",()=>{
        page2.updatePluginDataPencilIcon.click();
        browser.executeScript('window.scrollTo(0,500);');
        browser.sleep(3000);
        
        let overlay=new UpdatePluginDataOverlay();  
        overlay.hostTxtBx.clear().then(()=>{
            browser.sleep(3000);
            overlay.hostTxtBx.sendKeys("a");
            overlay.hostTxtBx.sendKeys(protractor.Key.BACK_SPACE);
            browser.sleep(3000);
            expect(overlay.hostRequiredErrMsg.isDisplayed()).toBe(true);
            overlay.submitBtn.click();
            
         });
        });

        
    it("Verify that port value must not exceed 65535",()=>{
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay=new UpdatePluginDataOverlay();  
            overlay.portTxtBx.clear();
            overlay.portTxtBx.sendKeys("99999");
            browser.sleep(3000);

            expect(overlay.portErrMsg.getText()).toEqual("The maximum value to accept for this input 65535");
        })

    it("Verify that port value must not be less than 1",()=>{
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay=new UpdatePluginDataOverlay();  
            overlay.portTxtBx.clear();
            overlay.portTxtBx.sendKeys("0");
            browser.sleep(3000);

            expect(overlay.portErrMsg.getText()).toEqual("The minimum value to accept for this input 1");
        })

    it("Verify that TimeOut field accepts numeric values and can also be blank",()=>{
        //check if TimeOut field accepts null value   
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay=new UpdatePluginDataOverlay();  
            overlay.TimeOutField.clear();
            overlay.submitBtn.click();
        // check if TimeOut field accepts numeric value
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay1=new UpdatePluginDataOverlay();  
            overlay1.TimeOutField.clear();
            overlay1.TimeOutField.sendKeys("500");
            overlay1.submitBtn.click();

    })

    it("Verify that ReadTimeOut field accepts numeric values and can also be blank",()=>{
        //check if ReadTimeOut field accepts null value   
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay=new UpdatePluginDataOverlay();  
            overlay.ReadTimeOutField.clear();
            overlay.submitBtn.click();
        // check if ReadTimeOut field accepts numeric value
            page2.updatePluginDataPencilIcon.click();
            browser.executeScript('window.scrollTo(0,500);');
            browser.sleep(3000);

            let overlay1=new UpdatePluginDataOverlay();  
            overlay1.ReadTimeOutField.clear();
            overlay1.ReadTimeOutField.sendKeys("500");
            overlay1.submitBtn.click();

    })

    it("Verify that user able to update the dynamic plugin data of any monitor using the dynamic form component",()=>{
        page2.updatePluginDataPencilIcon.click();
        browser.executeScript('window.scrollTo(0,500);');
        browser.sleep(3000);

        let overlay=new UpdatePluginDataOverlay();
        overlay.hostTxtBx.clear();
        overlay.hostTxtBx.sendKeys('Google.com');
        overlay.submitBtn.click();

        expect(page2.monitorTypeMonitorDetails.getText()).toEqual("net_response monitor Details");
    })


    });