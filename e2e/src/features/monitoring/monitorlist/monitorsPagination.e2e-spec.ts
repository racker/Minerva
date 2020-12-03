import { AppPage } from "../../../pages/app.po"
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by} from "protractor";


describe("Test pagination functionality on Monitors List page", () => {
    let page:AppPage;
    let nav:navigations;
    let page1:MonitorsListPage;

    beforeAll(()=>{
      page=new AppPage();
      page.navigateTo();
      browser.manage().window().maximize();
    });
    
    beforeEach(()=>{
       nav=new navigations();
       nav.navigateToMonitor();
       browser.sleep(5000);
       page1=new MonitorsListPage();
    });

    it("Verify that the user is directed to last page when clicked on last page button", () => {
        page1.paginationLastPageButton().click();
        browser.sleep(5000);
        expect(page1.paginationLastPageButton().isEnabled()).toBe(false);
        expect(page1.paginationNextPageButton().isEnabled()).toBe(false);
    
    });
    
    it("Verify that the user is directed to first page when clicked on first page button", () => {
        page1.paginationFirstPageButton().click();
        browser.sleep(5000);
        expect(page1.paginationFirstPageButton().isEnabled()).toBe(false);
        expect(page1.paginationPreviousPageButton().isEnabled()).toBe(false);
    
    });

    it("Verify that the user is directed to next page when clicked on next page button", () => {
      page1.paginationNextPageButton().click();
      browser.sleep(5000);
      expect(page1.SecondPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify that the user is directed to previous page when clicked on previous page button", () => {
        page1.paginationNextPageButton().click();
        browser.sleep(5000);
        page1.paginationPreviousPageButton().click();
        browser.sleep(5000);
        expect(page1.firstPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify that the pages are populated on pagination", () => {
      page1.noOfRows.then(function(rows){
      expect(rows.length).toEqual(25);
      })
        
      browser.sleep(5000);
      
      page1.SecondPageButton().click();
      page1.noOfRows.then(function(rows){
        expect(rows.length).toEqual(5);
      })   
    });

});