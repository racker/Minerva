import { element, by, browser } from "protractor";



export class UpdatePluginDataOverlay{

   cancelBtn                =element.all(by.xpath("//button[@class='hxBtn ng-tns-c63-0' or contains(text(),'Cancel')]"));
   hostTxtBx                =element(by.xpath("//input[@placeholder='host']"));  
   hostRequiredErrMsg       =element(by.xpath("//span[contains(text(),'host Required')]"));
   submitBtn                =element(by.xpath("//div[@class='topMargin ng-tns-c64-0']//button[@type='submit']"));
   portTxtBx                =element(by.xpath("//input[@placeholder='port']"));
   portErrMsg               =element(by.xpath("//span[@class='required ng-star-inserted']"));
   TimeOutField             =element(by.xpath("//input[@placeholder='timeout']"));
   ReadTimeOutField         =element(by.xpath("//input[@placeholder='readTimeout']"));
   ProtocolDrpDwn           =element(by.tagName('select'));

   selectAnOptionFromProtocolDropdown(){
      this.ProtocolDrpDwn.click();
      browser.sleep(3000);
      var selectAnOption=this.ProtocolDrpDwn.element(by.xpath("//option[contains(text(),'Select an option')]"));
      selectAnOption.click();
   }





}