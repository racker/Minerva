
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { LogLevels } from 'src/app/_enums/log-levels.enum'
import { LoggingService } from "../logging/logging.service";
import { of, Observable } from "rxjs";
import { zoneMocks } from "../../_mocks/zones/zone.service.mock";
import { Zones } from "src/app/_models/zone";
import { PortalDataService } from "../portal/portal-data.service";
import { EnvironmentConfig } from "../featureConfig/environmentConfig.service";

const httpsoption = {
    headers: new HttpHeaders(
        {
            'Content-type': 'application/json'
        }
    )
}

@Injectable({
    providedIn: 'root'
})
export class ZoneService {

    private mockZones = new zoneMocks();
    private _monZone;

    get zones() {
        return this._monZone;
    }
    set setzone(data: any) {
        this._monZone = data;
    }

    constructor(private http: HttpClient, 
        private portalService:PortalDataService,
        private logService: LoggingService, private env : EnvironmentConfig) { }

    /**
     * Get Zones
     * @returns Zones with pagination details
     */
    getZones(): Observable<Zones> {
        if (this.env.mock) {
            let mock = Object.assign({}, this.mockZones.zones);
            this._monZone = mock;
            return of<Zones>(this._monZone);
        }
        return this.http.get<Zones>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/zones`, httpsoption)
            .pipe(
                tap(data => {
                    this._monZone = data;
                    this.logService.log(this._monZone, LogLevels.info);
                })
            )
    }
}
