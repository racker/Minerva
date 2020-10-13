import { element, by, browser } from "protractor";

export class DeleteSelectedMonitorOverlay{

    deleteSelectedMonitorOverlay=element(by.id('delMonitorModal'));
    confirmBtn                  =element(by.id('confrmBtn'));
    okBtn                       =element(by.id('triggerOk')); 
    confirmMonitorModal         =element(by.id('confirmMonitorModal'));
    successListOfMonitors       =element.all(by.xpath("//hx-div[@class='hxDivSuccess']"))
    cancelBtn                   =element(by.id('cancelBtn'));


}