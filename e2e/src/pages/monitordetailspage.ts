import { element, by, WebElement } from "protractor"


export class MonitorsDetailsPage
{  
   additionalSettingslink:WebElement   =element(by.xpath("//a[@class='addSettings ng-tns-c61-0']"));
   periodValue:WebElement              =element(by.id("adnlSttngPrd"));
   labelSelectorMethodValue:WebElement =element(by.id("adtnlLblSlctor"));
   policyValue:WebElement              =element(by.id("excldRcPlcy"));
  

  labelsInfoKeyDisplay(key:string){
     return(element(by.xpath("//div[contains(text(),'"+key+"')]")));
     
  }

  labelsInfoValueDisplay(value:string){
    return(element(by.xpath("//div[contains(text(),'"+value+"')]")));
    }

  getPeriod(){
    return(this.periodValue.getText());
  }

  getlabelSelectorMethod(){
    return(this.labelSelectorMethodValue.getText());
  }

  getPolicy(){
    return(this.policyValue.getText());
  }
  
  getExcludedResources(num:number){
    return(element(by.id('resource'+num+'')).getText());
  }

  
}