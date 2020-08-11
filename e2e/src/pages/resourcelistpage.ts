import { element, by } from "protractor";

export class resourcesListPage
{
    resourcesPageHeader=element(by.xpath("//app-resources[@class='page']//h2"));

    ClickOnAnyResource(resource:string)
    {
        element(by.linkText(resource)).click();
    }


}