import { element, by, browser } from "protractor";

export class DeleteSelectedMonitorOverlay{

    deleteSelectedMonitorOverlay=element(by.id('delMonitorModal'));
    confirmBtn                  =element(by.id('confrmBtn'));
    okBtn                       =element(by.id('triggerOk')); 
    confirmMonitorModal         =element(by.id('confirmMonitorModal'));
    successListOfMonitors       =element(by.xpath("//*[text() = ' 5 out of 5 were deleted successfully! ']"))
    cancelBtn                   =element(by.id('cancelBtn'));
    listOfSinglepageMonitors    =element(by.xpath("//*[text() = ' 25 out of 25 were deleted successfully! ']"))
    rowPath                     =element(by.css("table.hxTable tbody")).all(by.tagName("tr"))


}