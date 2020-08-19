import { element, by } from "protractor";

export class ResourcesDetailsPage
{

    actionsDropdown                    =element(by.xpath("//hx-disclosure[@class='hxBtn']//hx-icon[@class='hxPrimary']"));
    actionDropdownOptions              =element.all(by.tagName("hx-menuitem"));
    deleteResourceOverlayHeader        =element(by.xpath("//hx-modal[@id='delResModal']//header"));
    confirmBtnOnDeleteResourceOverlay  =element(by.xpath("//hx-modal[@id='delResModal']//footer//button[contains(text(),'Confirm')]"));
    metadatapencil                     =element(by.xpath("//hx-disclosure[@id='metapop']"));
    metadataPopover                    =element(by.xpath("//hx-popover[@id='metaPopover']"));

    
    clickOnMetadataPencil(){
        this.metadatapencil.click();
    }

    checkForTheDisplayOfMetaPopover(){
        this.metadataPopover.isDisplayed();
    }


    checkForDisplayOfDeleteResourceOption()
    {   var dropdownOptions=element.all(by.tagName("hx-menuitem"));
        expect(dropdownOptions.get(2).getText()).toEqual('Delete Resource');
    }

    checkForTheDisplayOfDeleteResourceOverlay(){
       expect(this.deleteResourceOverlayHeader.isDisplayed()).toBe(true);
    }
}