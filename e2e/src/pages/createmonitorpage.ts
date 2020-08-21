import { element, by, browser, protractor } from "protractor";

export class CreateMonitorPage{

pageTitle               =element(by.xpath("//h2[@class='ng-tns-c63-0' or contains(text(),'Create Monitor')]"));
monitorTypeDropdown     =element(by.xpath("//select[@id='selType']"));
monitorNameTextBox      =element(by.id("txtMonitor"));
additionalSettingsLink  =element(by.xpath("//a[@class='ng-tns-c63-0' or contains(text(),'Additional Settings')]"))
keyDropdown             =element(by.id("txtKey-0"));
valueDropdown           =element(by.id("txtValue-0"));
submitBtn               =element(by.xpath("//button[@type='submit']"));
plusIcon                =element.all(by.xpath("//hx-icon[@type='plus']")).get(1);
minusIcon               =element.all(by.xpath("//hx-icon[@type='minus']"));



selectLocalMonitorType(monitor:string){
    this.monitorTypeDropdown.click();
    var localMonitorType=element(by.xpath("//optgroup[@label='Local']/option[contains(text(),'"+monitor+"')]"));
    localMonitorType.click();
}

selectRemoteMonitorType(monitor:string){
    this.monitorTypeDropdown.click();
    var remoteMonitorType=element(by.xpath("//optgroup[@label='Remote']/option[contains(text(),'"+monitor+"')]"));
  remoteMonitorType.click();
}


enterMonitorName(monitorName:string){
    this.monitorNameTextBox.sendKeys(monitorName);
}

selectKeyFromDropdown(key:string){
    this.keyDropdown.click();
    this.keyDropdown.sendKeys(key);
    this.keyDropdown.sendKeys(protractor.Key.TAB);
    browser.sleep(3000);

}

selectValueFromDropdown(value:string){
    this.valueDropdown.click(); 
    this.valueDropdown.sendKeys(value);
    this.valueDropdown.sendKeys(protractor.Key.TAB);
    browser.sleep(3000);
    }
}