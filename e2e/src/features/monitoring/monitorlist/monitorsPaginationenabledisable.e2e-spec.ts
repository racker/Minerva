import { AppPage } from "../../../pages/app.po"
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by} from "protractor";


describe("Test pagination functionality on Monitors List page to enable and disbale",function(){
    let page:AppPage;
    let nav:navigations;
    let page1:MonitorsListPage;

    beforeAll(()=>{
       page=new AppPage();
       page.navigateTo();
       
    });
    
    beforeEach(()=>{
       nav=new navigations();
       nav.navigateToMonitor();
       page1=new MonitorsListPage();

    })

    it("Verify that first page button is disabled on initial load",function(){
        expect(page1.paginationFirstPageButton().isEnabled()).toBe(false);

    });

    it("Verify that previous page button is disabled on initial load",function(){
        expect(page1.paginationPreviousPageButton().isEnabled()).toBe(false);
    
    });

    it("Verify that last page button is enabled on initial load",function(){
        expect(page1.paginationLastPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify that next page button is enabled on initial load",function(){
        expect(page1.paginationNextPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify last page button is disabled on clicking on last page button",function(){
        page1.paginationLastPageButton().click();
        expect(page1.paginationLastPageButton().isEnabled()).toBe(false);
    
    });

    it("Verify next page button is disabled on clicking on last page button",function(){
        page1.paginationLastPageButton().click();
        expect(page1.paginationNextPageButton().isEnabled()).toBe(false);
    
    });

    it("Verify first page button is enabled on clicking on last page button",function(){
        page1.paginationLastPageButton().click();
        expect(page1.paginationFirstPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify previous page button is enabled on clicking on last page button",function(){
        page1.paginationLastPageButton().click();
        expect(page1.paginationPreviousPageButton().isEnabled()).toBe(true); 
    
    });
});