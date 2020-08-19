import { AppPage } from "../../pages/app.po"
import { navigations } from "../../commons/navigations";
import { MonitorsListPage } from "../../pages/monitorlistpage";
import { browser, element, by} from "protractor";


describe("Test page loading/spinner functionality",()=>{

    let page:AppPage;
    let nav:navigations;
    let page1:MonitorsListPage;

    beforeAll(()=>{
       page=new AppPage();
       page.navigateTo();
       
    });
    
    beforeEach(()=>{
       nav=new navigations();
       
    });

        /*if you want to execute below testcases then  add delay to 

        files->monitor.service.ts(return of<Monitors>(this.monitors).pipe(delay(5000));) and 

        resources.service.ts(return of<Resources>(this.resources).pipe(delay(5000));) 

        without which the below testcases will fail so excluding the 

        below testcases from regression suite.
        */

        xit("Verify if spinner is present while navigating to resources list page",async()=>{
          var theLoader = await browser.executeScript("return document.querySelectorAll('.gbl-spinner-show').length"
          );
          expect(theLoader).toEqual(1);
          // console.log("result is:" + JSON.stringify(theLoader));
        });

        xit("Verify if spinner is present while navigating to monitor list page",async()=>{
          element(by.xpath("//a[text()='Monitoring']")).click();
          var theLoader = await browser.executeScript("return document.querySelectorAll('.gbl-spinner-show').length"
          );
          expect(theLoader).toEqual(1);
          // console.log("result is:" + JSON.stringify(theLoader));
    });
});
