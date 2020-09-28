import { element, by, browser } from "protractor";



export class DeleteEventOverlay{
    deleteEventPopOver    =element(by.id('delEventModal'))
    confirmBtn            =element(by.xpath("//hx-modal[@id='delEventModal']//button[@id='confrmBtn']"))
    cancelBtn             =element(by.id('cancelBtn'))

    confirmBtnRemovesPopOver(){
        browser.executeScript("arguments[0].click();",this.confirmBtn);
        browser.sleep(3000);
        expect(this.deleteEventPopOver.getAttribute('aria-hidden')).toBe('true');
    }
    
}