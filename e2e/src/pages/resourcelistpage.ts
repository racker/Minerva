import { element, by } from "protractor";

export class ResourcesListPage
{
    resourcesPageHeader        =element(by.xpath("//app-resources[@class='page']//h2"));
    resourceWebtable           =element(by.tagName('tbody'));
    noOfResources              =this.resourceWebtable.all(by.tagName('tr'));
    resourcesCheckBoxes        =this.noOfResources.all(by.tagName('hx-checkbox'))  
    headerCheckBox             =element(by.tagName('th')).element(by.tagName('hx-checkbox'))
    deleteBtn                  =element(by.xpath("//hx-disclosure[contains(text(),'Delete')]"))

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