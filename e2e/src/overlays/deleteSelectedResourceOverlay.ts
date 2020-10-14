import { element, by, browser } from "protractor";

export class DeleteSelectedResourceOverlay{

    deleteSelectedResourceOverlay=element(by.id('delResourceModal'));
    confirmBtn                  =element(by.id('confrmBtn'));
    cancelBtn                   =element(by.id('cancelBtn'));
    okBtn                       =element(by.xpath("//button[contains(text(),'Ok')]")); 
    confirmMonitorModal         =element(by.id('confirmResourceModal'));
    successListOfResources      =element.all(by.xpath("//hx-div[@class='hxDivSuccess']"))
    closeBtn                    =element(by.id('hxClose'))

}