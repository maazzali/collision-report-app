import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) {}

  public getJSON(filename) {
    return this.http.get(`/assets/data/${filename}.json`)
      .pipe(map( (resp: any) => {
        switch (filename) {
          case 'company':
            return this._transformCompanyData(resp);
          case 'driver':
            return this._transformDriverData(resp);
          case 'vehicle':
            return this._transformVehicleData(resp);
          case 'location':
            return this._transformLocationData(resp);
          default:
            return resp;
        }
      }));
  }

  private _transformCompanyData(res: any) {
    const company = res[0];
    const dotIds = company.dot_ids.substring(1, company.dot_ids.indexOf('}'));
    return {
      name: company.name,
      address: `${company.street}, ${company.city}, ${company.state} ${company.zip}`,
      dotNo: dotIds,
    };
  }

  private _transformDriverData(res: any) {
    const driver = res[0];
    return {
      name: `${driver.first_name} ${driver.last_name}`,
      email: driver.email,
      phone: driver.phone,
      licenseNo: driver.drivers_license_number,
      state: driver.drivers_license_state
    };
  }

  private _transformVehicleData(res: any) {
    const vehicle = res[0];
    return {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      vin: vehicle.vin,
      licensePlate: vehicle.license_plate_number,
      state: vehicle.license_plate_state
    };
  }

  private _transformLocationData(res: any) {
    return res.map(obj => {
      return {
        value: obj.kph,
        time: new Date(obj.located_at),
        lat: obj.lat,
        lng: obj.lon,
        bearing: obj.bearing,
      };
    });
  }
}
