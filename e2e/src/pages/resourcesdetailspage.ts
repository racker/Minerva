import { element, by } from "protractor";

export class resourcesDetailsPage
{

    actionsDropdown                    =element(by.xpath("//hx-disclosure[@class='hxBtn']//hx-icon[@class='hxPrimary']"));
    actionDropdown_options             =element.all(by.tagName("hx-menuitem"));
    deleteResourceOverlayHeader        =element(by.xpath("//hx-modal[@id='delResModal']//header"));
    confirmBtnOnDeleteResourceOverlay  =element(by.xpath("//hx-modal[@id='delResModal']//footer//button[contains(text(),'Confirm')]"));
    metadatapencil                     =element(by.xpath("//hx-disclosure[@id='metapop']"));
    metadataPopover                    =element(by.xpath("//hx-popover[@id='metaPopover']"));
    
    clickOnActionsDropdown(){
        this.actionsDropdown.click();
    }

    clickOnDeleteResourceOption(){
        this.actionDropdown_options.get(2).click();
    }
    
    clickOnMetadataPencil(){
        this.metadatapencil.click();
    }

    checkForTheDisplayOfMetaPopover(){
        this.metadataPopover.isDisplayed();
    }


    checkForDisplayOfDeleteResourceOption()
    {   var dropdown_options=element.all(by.tagName("hx-menuitem"));
        expect(dropdown_options.get(2).getText()).toEqual('Delete Resource');
    }

    checkForTheDisplayOfDeleteResourceOverlay(){
       this.deleteResourceOverlayHeader.isDisplayed();
    }
}