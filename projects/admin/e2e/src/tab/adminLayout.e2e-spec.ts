import { AppPage } from "../../../../../e2e/src/pages/app.po";
import { navigations } from "../../../../../e2e/src/commons/navigations";
import { browser } from "protractor";
import { AdminToolsPage } from "../../../../../e2e/src/pages/adminToolsPage";




describe("Test layout of admin tools", ()=> {
    let page : AppPage;
    let nav  : navigations;
    let page1: AdminToolsPage;

    
 
    beforeAll(() => {
       page = new AppPage();
       page.navigateTo();
       browser.manage().window().maximize();
    });
 
    beforeEach(() => {
       nav = new navigations();
       nav.navigateToAdmin();
       page1=new AdminToolsPage();

    });

    it("To test admin section of Minerva have the general layout of monitoring.rackspace.net",()=>{
       expect(page1.accountSearchBox.isDisplayed()).toBe(true);
       expect(page1.monitorsTab.isDisplayed()).toBe(true);
       expect(page1.resourcesTab.isDisplayed()).toBe(true);

});

});