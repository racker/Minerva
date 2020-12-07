import { element, by, browser } from "protractor";

export class DeleteSelectedResourceOverlay{

    deleteSelectedResourceOverlay=element(by.id('delResourceModal'));
    confirmBtn                  =element(by.id('confrmBtn'));
    cancelBtn                   =element(by.id('cancelBtn'));
    okBtn                       =element(by.xpath("//button[contains(text(),'Ok')]")); 
    confirmMonitorModal         =element(by.id('confirmResourceModal'));
    successListOfResources      =element(by.xpath("//*[text() = ' 5 out of 5 were deleted successfully! ']"))
    closeBtn                    =element(by.id('hxClose'))
    resRowPath                  =element(by.css("table.hxTable tbody")).all(by.tagName("tr"))

}