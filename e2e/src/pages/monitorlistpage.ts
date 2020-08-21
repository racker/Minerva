import { element, by } from "protractor"


export class MonitorsListPage
{
    pageTitle          =element(by.xpath("//h2[contains(text(),'Monitors')]"));
    createMonitorBtn   =element(by.xpath("//button[@class='hxBtn hxPrimary' or contains(text(),'Create Monitor')]"));

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