import { element, by, WebElement } from "protractor"


export class MonitorsDetailsPage
{  
   additionalSettingslink     =element(by.xpath("//a[contains(text(),'Additional Settings')]"));
   periodValue                =element(by.id("adnlSttngPrd"));
   labelSelectorMethodValue   =element(by.id("adtnlLblSlctor"));
   policyValue                =element(by.id("excldRcPlcy"));
   updatePluginDataPencilIcon =element(by.xpath("//hx-icon[@id='pencilIcn']"));
   dynamicPluginDataPopover   =element(by.xpath("//div[@id='updateForm']"));
   monitorTypeMonitorDetails  =element(by.xpath("//h4[contains(text(),'net_response monitor Details')]"));
  


  eventName(event:string){
    return(element(by.xpath(`//a[contains(text(),'${event}')]`)));
  }
  
  labelsInfoKeyDisplay(key:string){
     return(element(by.xpath(`//div[contains(text(),'${key}')]`)));
     
  }

  labelsInfoValueDisplay(value:string){
    return(element(by.xpath(`//div[contains(text(),'${value}')]`)));
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
    return(element(by.id(`resource${num}`)).getText());
  }

  
}