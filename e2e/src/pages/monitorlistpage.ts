import { element, by } from "protractor"


export class MonitorsListPage
{


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