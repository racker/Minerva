import { element, by, ElementFinder } from "protractor"


export class MonitorsListPage
{
    pageTitle                  =element(by.xpath("//h2[contains(text(),'Monitors')]"));
    createMonitorBtn            =element(by.xpath("//button[@class='hxBtn hxPrimary' or contains(text(),'Create Monitor')]"));
    webtable                    =element(by.tagName('tbody'));
    noOfRows                    =this.webtable.all(by.tagName('tr'));
    checkBoxes                  =this.noOfRows.all(by.tagName('hx-checkbox'))  
    deleteBtn                   =element(by.xpath("//hx-disclosure[contains(text(),'Delete')]"))
    headerCheckBox              =element(by.tagName('th')).element(by.tagName('hx-checkbox'))
    createSuppression           =element(by.xpath("//button[contains(text(),'Create Suppression')]"))
    copyMonitor                 =element(by.xpath("//button[contains(text(),'Copy Monitor')]"))
    createMonitor               =element(by.xpath("//button[@class='hxBtn hxPrimary']"))
    uncheckCheckbox1            =element(by.xpath("//tr[3]//td[1]//hx-checkbox-control[1]//label[1]//hx-checkbox[1]"))
    uncheckCheckbox2            =element(by.xpath("//tr[2]//td[1]"))
    searchTextBox               =element(by.xpath("//input[@id='txtSearch']"))
    colPath                     =element.all(by.tagName("th"))
    firstRecord                 =element.all(by.xpath("//a[contains(text(),'Bandwidth Monitoring for eth0')]"))
    actionsButton               =element(by.xpath("//span[@id='btnActions']"))
    deleteMonitor               =element(by.xpath("//hx-disclosure[contains(text(),'Delete Monitor')]"))
    updateMonNamePen            =element(by.xpath("//hx-disclosure[@id='updateMonNamePen']"))
    renameMonitor               =element(by.xpath("//input[@id='txtResource']"))
    renameMonitorSubmit         =element(by.xpath("//button[@id='btnMonitorName' and @type='submit']"))
    keyDrpDown                  =element(by.id("txtKey-0"))
    keyListOptions              =element.all(by.xpath("//datalist[@id='list-keys']//option"))
    plusValue                   =element(by.xpath("//div[@class='hxRow hxSpan-10 nowrap ng-untouched ng-pristine ng-valid ng-star-inserted']//button[@class='hxBtn inline-button ng-star-inserted']"))      
    keyValue1                   =element(by.id("txtKey-1"))
    keyValue2                   =element(by.id("txtValue-1"))
    minusValue                  =element.all(by.xpath("//button[@class='hxBtn space-right inline-button ng-star-inserted']"))
    monitorTypeDrpDown          =element(by.xpath("//select[@id='selType']"))
    valueNetResponse            =element(by.xpath("//select[@id='selType']//option[text()='NetResponse']"))
    valueProtocol               =element(by.xpath("//input[@placeholder='port']"))
    errorMsgProtocolValue       =element(by.xpath("//span[@class='required ng-star-inserted']"))
    valueTimeout                =element(by.xpath("//input[@placeholder='timeout']"))
    valueReadTimeout            =element(by.xpath("//input[@placeholder='readTimeout']"))
    msgTimeout                  =element(by.xpath("//input[@placeholder='timeout']"))
    msgReadTimeout              =element(by.xpath("//input[@placeholder='readTimeout']"))
    headerMonitor               =element(by.xpath("//a[text()='Monitoring']"))     
   
    selectFiveMonitors(){
        let count:number;
        for(let i=0;i<=4;i++){
           this.checkBoxes.get(i).click();
           count=i;
        }
        count++;
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

   selectAParticularCheckBox(checkboxNo:number){
        return(element(by.xpath('//tr['+checkboxNo+']//hx-checkbox')))
   }
   

    paginationLastPageButton(){
        return(element(by.xpath("//button[@class='hxBtn lastPage']")));
    }

    paginationNextPageButton(){
        return(element(by.xpath("//button[@class='hxBtn nextPage']")));
    }

    paginationFirstPageButton(){
        return(element(by.xpath("//button[@class='hxBtn firstPage']")));
    }

    paginationPreviousPageButton(){
        return(element(by.xpath("//button[@class='hxBtn prevPage']")));
    }

    firstPageButton(){
        return(element(by.xpath("//button[@class='hxBtn' and contains(text(),'1')]")));
    }
    
    SecondPageButton(){
        return(element(by.xpath("//button[@class='hxBtn' and contains(text(),'2')]")));
    }

    monitorName(){
        return(element(by.xpath("//a[contains(text(),'Bandwidth Monitoring for eth0')]")));
    }

    spinner() {
        return(element(by.xpath("//hx-busy[@class='gbl-spinner-show']")));
        
    }


}