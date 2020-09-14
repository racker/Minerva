import { element, by, browser, protractor } from "protractor";

export class CreateMonitorPage{

pageTitle                  =element(by.xpath("//h2[@class='ng-tns-c63-0' or contains(text(),'Create Monitor')]"));
monitorTypeDropdown        =element(by.xpath("//select[@id='selType']"));
monitorNameTextBox         =element(by.id("txtMonitor"));
additionalSettingsLink     =element(by.xpath("//a[@class='ng-tns-c63-0' or contains(text(),'Additional Settings')]"))
keyDropdown                =element(by.id("txtKey-0"));
valueDropdown              =element(by.id("txtValue-0"));
submitBtn                  =element(by.xpath("//button[@type='submit']"));
plusIcon                   =element.all(by.xpath("//hx-icon[@type='plus']"));
minusIcon                  =element.all(by.xpath("//hx-icon[@type='minus']"));
periodLabel                =element(by.xpath("//h4[contains(text(),'Period')]"));
excludedResourcesLabel     =element(by.xpath("//h4[contains(text(),'Excluded Resources')]"));
resourceIDLabel            =element(by.xpath("//h4[contains(text(),'Resource ID')]"));
labelSelectorMethod        =element(by.xpath("//h4[contains(text(),'Label Selector Method')]"));
periodTxtBx                =element(by.id('txtInterval'));
excludedResourcesDrpdwn    =element.all(by.xpath("//select[@ng-reflect-name='resource']"));
labelSelectorMethodDrpDwn  =element(by.xpath("//select[@ng-reflect-name='labelSelectorMethod']"))
labelSelectorMethodEntries =element.all(by.xpath("//option[contains(text(),'AND') or contains(text(),'OR')]"));



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

addNewExcludedResourcesDrpDwn(){
    this.plusIcon.get(0).click();
    expect(this.excludedResourcesDrpdwn.count()).toEqual(2);
}

removeExcludedResourcesDrpDwn(){
    this.minusIcon.get(1).click();
    expect(this.excludedResourcesDrpdwn.count()).toEqual(1);
}

checkTheEntriesOfLabelSelectorMethodDrpDwn(){
    this.labelSelectorMethodDrpDwn.click();
    browser.sleep(5000);
    expect(this.labelSelectorMethodEntries.count()).toEqual(2);
}

checkDrpDwnIsLoadedWIthResourceData(drpDwn:string){
    var resourcesDrpDwn=element(by.xpath(`//select[@ng-reflect-name='${drpDwn}']`))
    resourcesDrpDwn.click();
    var drpDwnEntries=element.all(by.xpath(`//select[@ng-reflect-name='${drpDwn}']//option[contains(text(),'development')]`))
    expect(drpDwnEntries.count()).toEqual(25);
}
}