import { element, by, browser } from "protractor";

export class DeleteSelectedMonitorOverlay{

    deleteSelectedMonitorOverlay=element(by.id('delMonitorModal'));
    confirmBtn                  =element(by.id('confrmBtn'));
    okBtn                       =element(by.id('triggerOk')); 
    confirmMonitorModal         =element(by.id('confirmMonitorModal'));

}