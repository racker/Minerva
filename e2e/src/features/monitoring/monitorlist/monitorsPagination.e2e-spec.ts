import { AppPage } from "../../../pages/app.po"
import { navigations } from "../../../commons/navigations";
import { MonitorsListPage } from "../../../pages/monitorListPage";
import { browser, element, by} from "protractor";


describe("Test pagination functionality on Monitors List page",function(){
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


    it("Verify that the user is directed to last page when clicked on last page button",function(){
        page1.paginationLastPageButton().click();
        browser.sleep(5000);
        expect(page1.paginationLastPageButton().isEnabled()).toBe(false);
        expect(page1.paginationNextPageButton().isEnabled()).toBe(false);
    
    });
    
    it("Verify that the user is directed to first page when clicked on first page button",function(){
        page1.paginationFirstPageButton().click();
        browser.sleep(5000);
        expect(page1.paginationFirstPageButton().isEnabled()).toBe(false);
        expect(page1.paginationPreviousPageButton().isEnabled()).toBe(false);
    
    });

    it("Verify that the user is directed to next page when clicked on next page button",function(){
      page1.paginationNextPageButton().click();
      browser.sleep(5000);
      expect(page1.SecondPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify that the user is directed to previous page when clicked on previous page button",function(){
        page1.paginationNextPageButton().click();
        browser.sleep(5000);
        page1.paginationPreviousPageButton().click();
        browser.sleep(5000);
        expect(page1.firstPageButton().isEnabled()).toBe(true);
    
    });

    it("Verify that the pages are populated on pagination",function(){
      var tableBody= element(by.tagName("tbody"));
      element.all(by.tagName("tr")).then(function(rows){
        expect(rows.length).toEqual(26);
      })
        
      browser.sleep(5000);
      
      page1.SecondPageButton().click();
      element.all(by.tagName("tr")).then(function(rows){
          expect(rows.length).toEqual(6);
      })   
});

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