import { element, by, browser, protractor } from "protractor";

export class AdminToolsPage{
    
    accountSearchBox = element(by.xpath("//input[@placeholder='Account Search']"));
    monitorsTab      = element(by.xpath("//hx-tab[contains(text(),'Monitors')]"));
    resourcesTab     = element(by.xpath("//hx-tab[contains(text(),'Resources')]"));

}