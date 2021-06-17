import { element, by, WebElement, browser } from "protractor"
import { URLSearchParams } from "url";


export class VisualizeViewPage
{
    additionalSettingslink     =element(by.xpath("//a[contains(text(),'Additional Settings')]"));
    presetButton               =element(by.xpath("//span[contains(.,'PRESETS')]"));
    oneHRButton                =element(by.xpath("//span[contains(.,'1 HR')]"));
    eightHRButton              =element(by.xpath("//span[contains(.,'8 HR')]"));
    dayButton                  =element(by.xpath("//span[contains(.,'DAY')]"));
    weekButton                 =element(by.xpath("//span[contains(.,'WEEK')]"));
    monthButton                =element(by.xpath("//span[contains(.,'MONTH')]"));
    customButton               =element(by.xpath("//span[contains(.,'CUSTOM')]"));
    startDate                  =element(by.id("txtStart"));
    //startCalendar            =element(by.xpath("(//hx-icon[contains(@type,'calendar')])[2]"));
    endDate                    =element(by.id("txtEnd"));
    //endCalendar              =element(by.xpath("(//hx-icon[contains(@type,'calendar')])[1]"));
    startCalendarDate          =element(by.xpath("//span[contains(.,'15')]"));
    //timeRange                  =element(by.id("//owl-date-time-timer[contains(.,'HourMinutePM')]"));
    //startTimeHR                =element(by.xpath("(//input[contains(@maxlength,'2')])[1]"));
    startTimeHR1               =element(by.xpath("(//input[@class='owl-dt-timer-input'])[1]"));
    startTimeMN                =element(by.xpath("(//input[contains(@maxlength,'2')])[2]"));
    endCalendarDate            =element(by.xpath("//span[contains(.,'24')]"));
    downArrow                  =element(by.xpath("(//span[@class='owl-dt-control-button-content'])[2]"));
    // pmButton                   =element(by.xpath("//span[@tabindex='-1'][contains(.,'PM')]"));
    // amButton                   =element(by.xpath("//span[@tabindex='-1'][contains(.,'AM')]"));
    pmButtonPress              =element(by.xpath("//span[@tabindex='-1'][contains(.,'PM')]")); 
    amButtonPress              =element(by.xpath("//span[contains(.,'PM')]"));               
    setButton                  =element(by.xpath("//span[contains(.,'Set')]"));
    applyButton                =element(by.xpath("//button[text()=' Apply ']"));
    monthDropdown              =element(by.css(".owl-dt-control-period-button > span:nth-child(1)"));
    yearButton                 =element(by.xpath("//span[@class='owl-dt-calendar-cell-content owl-dt-calendar-cell-today'][contains(.,'2021')]"));
    juneMonth                  =element(by.xpath("//span[contains(.,'Jun')]"));
    julyMonth                  =element(by.xpath("//span[contains(.,'Jul')]"));
    startTimeHR                =element(by.css("label.owl-dt-timer-content:nth-child(2) > input:nth-child(1)"));
    startTimeMIN               =element(by.css("label.owl-dt-timer-content:nth-child(3) > input:nth-child(1)"));

    getDate(date) {​​​​​​​​
        console.log("Visualize", date);
       
        var d = new Date(date);
          return [d.getFullYear(), `0${​​​​​​​​d.getMonth() + 1}​​​​​​​​`, d.getDate()].join('-');
    }

    // updateQueryStringParameter(){
    //     let url = new URL("https://dev.i.rax.io:4200/intelligence/visualize");
        
    //     var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    //     var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    //     if (uri.match(re)) {
    //         return uri.replace(re, '$1' + key + "=" + value + '$2');
    //     }
    //     else {
    //         return uri + separator + key + "=" + value;
    //     }
    // }

        
    //}
}