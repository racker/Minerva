import { element, by, WebElement } from "protractor"


export class monitorsDetailsPage
{

  additionalSettings   =element(by.xpath("//a[@class='addSettings ng-tns-c61-0']"));
  

  labelsInfoKeyDisplay(key:string){
     return(element(by.xpath("//div[contains(text(),'"+key+"')]")));
     
  }

  labelsInfoValueDisplay(value:string){
    return(element(by.xpath("//div[contains(text(),'"+value+"')]")));
    }
  
}