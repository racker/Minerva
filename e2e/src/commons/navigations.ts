import { browser, by, element, Button } from "protractor";
import { enableDebugTools } from "@angular/platform-browser";
import { exists } from "fs";


export class navigations 
{
    baseElement = 
  {
    root: element(by.css("#stage #nav")),  
  };
  
   navigateToResources()

   {
      // clicking on resources
      element(by.xpath("//a[text()='Resources']")).click();
      browser.sleep(5000);
      //  validate - add expect for resources
      expect(element(by.xpath("//h2[contains(text(),'Resources')]")).isPresent()).toBe(true);
   }
   async navigateToMonitor()
   {
   // clicking on Monitor
     element(by.xpath("//a[text()='Monitoring']")).click();
     browser.sleep(5000);
     // validate - add expect for Monitor
     expect(element(by.xpath("//h2[contains(text(),'Monitors')]")).isPresent()).toBe(true);
   }
   async navigateToVisualize()
   {
     //clicking on visualize
     element(by.xpath("//a[contains(text(),'Visualize')]")).click();
     browser.sleep(5000);
      // validate - add expect visualize
      expect(element(by.xpath("//a[contains(text(),'Visualize')]")).isPresent()).toBe(true);
     
   }


   navigateToAdmin(){
     element(by.xpath("//a[contains(text(),'Admin')]")).click();
   }
  
  async loadresources()
  {
    var page1 = element.all(by.xpath("//table[@class='hxTable']//tbody//tr"));
    var count1 = await page1.getAttribute("childElementCount");
  console.log("count of 1st page"+count1.length);
    browser.executeScript('window.scrollTo(0,10000);');
    var totalRowCount=0;
     
     var pageCount = element.all(by.xpath("//table[@class='hxTable']//tbody//tr/"));
     var rowCount = await pageCount.getAttribute("childElementCount");
     totalRowCount = rowCount.length+totalRowCount;
     console.log("inside the do loop"+totalRowCount);
     var buton = element(by.xpath("//button[@class='hxBtn nextPage']"));
     buton.click();
     
     while(rowCount.length>0)
    { 
      
       console.log("total count"+totalRowCount);
      // let status = (await element.all(by.css("button[aria-current='true']")));
      
    }

  }
   

async heliuxUIloads()
{
  // HelixUI link tag is expected to be 2nd link element
  var link = element(by.xpath("//head//link[2]"));
  var hre= await link.getAttribute("href");
 //validation basd on url. 
 
 expect(hre.indexOf('helix-ui.css')).toBeGreaterThan(0);
}   
    
}

  