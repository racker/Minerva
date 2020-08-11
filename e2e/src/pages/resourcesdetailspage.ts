import { element, by } from "protractor";

export class resourcesDetailsPage
{

    actionsDropdown=element(by.xpath("//hx-disclosure[@class='hxBtn']//hx-icon[@class='hxPrimary']"));
    
    actionDropdown_options=element.all(by.tagName("hx-menuitem"));
    
    deleteResourceOverlayHeader=element(by.xpath("//hx-modal[@id='delResModal']//header"));
    
    confirmBtnOnDeleteResourceOverlay=element(by.xpath("//hx-modal[@id='delResModal']//footer//button[contains(text(),'Confirm')]"));

    clickOnActionsDropdown(){
        this.actionsDropdown.click();
    }

    clickOnDeleteResourceOption(){
        this.actionDropdown_options.get(2).click();
    }

    checkForDisplayOfDeleteResourceOption()
    {   var dropdown_options=element.all(by.tagName("hx-menuitem"));
        expect(dropdown_options.get(2).getText()).toEqual('Delete Resource');
    }

    checkForTheDisplayOfDeleteResourceOverlay(){
       this.deleteResourceOverlayHeader.isDisplayed();
    }
}