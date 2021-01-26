import { element, by } from "protractor";

export class ResourcesListPage
{
    resourcesPageHeader        =element(by.xpath("//app-resources[@class='page']//h2"));
    resourceWebtable           =element(by.tagName('tbody'));
    noOfResources              =this.resourceWebtable.all(by.tagName('tr'));
    resourcesCheckBoxes        =this.noOfResources.all(by.tagName('hx-checkbox'))  
    headerCheckBox             =element(by.tagName('th')).element(by.tagName('hx-checkbox'))
    deleteBtn                  =element(by.xpath("//hx-disclosure[contains(text(),'Delete')]"))
    secondRecord               =element(by.xpath("//tr[2]//td[2]//a[1]"))
    nameLabel                  =element(by.xpath("//h4[contains(text(),'Labels')]"))
    updateLabelPen             =element(by.xpath("//hx-disclosure[@id='labelpop']"))
    plusLabelValue             =element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn inline-button']"))
    minusLabelValue            =element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//button[1]"))
    agentDiscover              =element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[@class='hxCol hxSpan-6']//div//div[1]//div[1]//hx-text-control[1]//input[1]"))
    errAgentDiscover           =element(by.xpath("//span[@class='required']"))     
    valueLabel                 =element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//div[2]//hx-text-control[1]//input[1]"))
    keyLabel                   =element(by.xpath("//div[@class='hxRow hxSpan-9 last-item']//div[4]//div[1]//hx-text-control[1]//input[1]"))
    cancelButton               =element(by.xpath("//hx-popover[@id='labelPopover']//button[@class='hxBtn'][contains(text(),'Cancel')]"))
    resHeaderCheckbox          =element(by.xpath("//th[@class='hxControl']//hx-checkbox-control//label//hx-checkbox"))
    createMultipleMonitors     =element(by.xpath("//button[contains(text(),'Create Multiple Monitors')]"))
    createSuppression          =element(by.xpath("//button[contains(text(),'Create Suppression')]"))
    addResourceBtn             =element(by.xpath("//hx-disclosure[@id='addResButton']"))
    submitAddResource          =element(by.xpath("//button[@class='hxBtn hxPrimary']"))
    cancelAddResource          =element(by.xpath("//button[contains(text(),'Cancel')]"))
    textAddResource            =element(by.xpath("//input[@id='txtResource']"))
    enablePresenceMon          =element(by.xpath("//label[contains(text(),'Enable Presence Monitoring')]"))
    textSearch                 =element(by.xpath("//input[@id='txtSearch']"))
    resColPath                 =element.all(by.xpath("//tbody//tr[2]//td"))
    webtable                   =element(by.tagName('tbody'));
    noOfRows                   =this.webtable.all(by.tagName('tr'));
    checkBoxes                 =this.noOfRows.all(by.tagName('hx-checkbox'))

    ClickOnAnyResource(resource:string)
    {
        element(by.linkText(resource)).click();
    }

    selectFiveResources(){
        let count:number;
        for(let i=0;i<=4;i++){
           this.resourcesCheckBoxes.get(i).click();
           count=i;
        }
        return count
   }

   selectTwentyfiveMonitors(){
    let count:number;
    for(let i=0;i<=24;i++){
       this.checkBoxes.get(i).click();
       count=i;
     }
     count++;
     return count
}

   selectFifteenResources(){
    let count:number;
    
    for(let i=0;i<=14;i++){
       this.resourcesCheckBoxes.get(i).click();
       count=i;
    }
    count++;
    return count;
}


}