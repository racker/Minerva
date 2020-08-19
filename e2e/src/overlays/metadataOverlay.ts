import { element, by, browser } from "protractor";
import { ResourcesDetailsPage } from "../pages/resourcesdetailspage";

export class MetadataOverlay extends ResourcesDetailsPage{

    metadataPopOver          =element(by.xpath("//hx-popover[@id='metaPopover']"));
    metadataHeader           =element(by.xpath("//hx-popover[@id='metaPopover']//header[contains(text(),' Metadata fields ')]"));
    metadataKeyInputField    =element(by.xpath("//hx-popover[@id='metaPopover']//input[@id='txtKey-1']"));
    metadataValueInputField  =element(by.xpath("//hx-popover[@id='metaPopover']//input[@id='txtValue-1']"));
    metadataPlusIcon         =element.all(by.xpath("//button[@class='hxBtn inline-button']//hx-icon[@type='plus']"));
    metadataMinusIcon        =element.all(by.xpath("//button[@class='hxBtn space-right inline-button']//hx-icon[@type='minus']"));
    metadataCancelBtn        =element(by.xpath("//hx-popover[@id='metaPopover']//button[contains(text(),'Cancel')]"));

    addsNewFieldSet(){

        this.metadataPlusIcon.get(0).click();
        browser.sleep(3000);
        expect(element(by.xpath("//hx-popover[@id='metaPopover']//input[@id='txtKey-2']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//hx-popover[@id='metaPopover']//input[@id='txtValue-2']")).isDisplayed()).toBe(true);
    }

    removesExistingFieldSet(){

        this.metadataMinusIcon.get(1).click();
        browser.sleep(3000);
        var keyvalue= element.all(by.xpath("//hx-popover[@id='metaPopover']//input"));
        expect(keyvalue.count()).toBe(2);
    }

    cancelBtnRemovesPopover(){

        this.metadataCancelBtn.click();
        browser.sleep(3000);
        expect(Boolean(this.metadataPopOver.getAttribute("aria-hidden"))).toBe(true);
    }

}