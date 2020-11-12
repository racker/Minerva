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