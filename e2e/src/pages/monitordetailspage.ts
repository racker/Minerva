import { element, by, WebElement } from "protractor"


export class MonitorsDetailsPage
{  
   additionalSettingslink   =element(by.xpath("//a[contains(text(),'Additional Settings')]"));
   periodValue              =element(by.id("adnlSttngPrd"));
   labelSelectorMethodValue =element(by.id("adtnlLblSlctor"));
   policyValue              =element(by.id("excldRcPlcy"));
  
  
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