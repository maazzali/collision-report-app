import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
const csv = require('csvtojson');

@Injectable()
export class MainService {

  constructor(private http: HttpClient) {}

  public getJSONFromCSV(fileId) {
    const csvFile = (document.getElementById(fileId)as any).files[0];
    const reader = new FileReader();
    const newPromise = new Promise(resolve => {
      reader.onload = (event: any) => {
        const contents = (event.target as any).result;
        csv()
          .fromString(contents)
          .then((jsonObj: any) => {
            switch (fileId) {
              case 'basic':
                resolve(this.transformBasicData(jsonObj));
                break;
              case 'company':
                resolve(this.transformCompanyData(jsonObj));
                break;
              case 'driver':
                resolve(this.transformDriverData(jsonObj));
                break;
              case 'vehicle':
                resolve(this.transformVehicleData(jsonObj));
                break;
              case 'location':
                resolve(this.transformLocationData(jsonObj));
                break;
              default:
                resolve(jsonObj);
                break;
            }
          });
      };
      reader.readAsText(csvFile);
    });
    return from(newPromise);
  }

  public getJSON(filename) {
    return this.http.get(`/assets/data/${filename}.json`)
      .pipe(map( (resp: any) => {
        switch (filename) {
          case 'company':
            return this.transformCompanyData(resp);
          case 'driver':
            return this.transformDriverData(resp);
          case 'vehicle':
            return this.transformVehicleData(resp);
          case 'location':
            return this.transformLocationData(resp);
          default:
            return resp;
        }
      }));
  }

  private transformCompanyData(res: any) {
    const company = res[0];
    const dotIds = company.dot_ids.substring(1, company.dot_ids.indexOf('}'));
    return {
      name: company.name,
      address: `${company.street}, ${company.city}, ${company.state} ${company.zip}`,
      dotNo: dotIds,
    };
  }

  private transformDriverData(res: any) {
    const driver = res[0];
    return {
      name: `${driver.first_name} ${driver.last_name}`,
      email: driver.email,
      phone: driver.phone,
      licenseNo: driver.drivers_license_number,
      state: driver.drivers_license_state
    };
  }

  private transformVehicleData(res: any) {
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

  private transformLocationData(res: any) {
    return res.map(obj => {
      return {
        value: obj.kph,
        time: new Date(obj.located_at),
        lat: obj.lat,
        lng: obj.lon,
        bearing: obj.bearing,
        state: obj.vehicle_state
      };
    });
  }

  private transformBasicData(res: any) {
    res = res[0];
    return {
      generatedBy: res.generated_by,
      reportId: res.report_id,
      reportDate: res.report_generation_date,
      pocName: res.poc_name,
      pocEmail: res.poc_email,
      pocPhone: res.poc_phone,
    };
  }
}
