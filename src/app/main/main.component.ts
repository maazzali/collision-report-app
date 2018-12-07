import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from './main.service';
import { combineLatest } from 'rxjs';
import { MapComponent } from '../common-components/map/map.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public details: any;
  @ViewChild(MapComponent) private map: MapComponent;

  constructor(private mainService: MainService) {}

  public submitFiles(evt) {
    this.initilizeReport();
    evt.preventDefault();
  }

  public ngOnInit() {
  }

  public initilizeReport() {
    const basicData = this.mainService.getJSONFromCSV('basic');
    const companyData = this.mainService.getJSONFromCSV('company');
    const driverData = this.mainService.getJSONFromCSV('driver');
    const vehicleData = this.mainService.getJSONFromCSV('vehicle');
    const locationData = this.mainService.getJSONFromCSV('location');
    const combinedData = combineLatest(basicData, companyData, driverData, vehicleData, locationData,
      (basic, company, driver, vehicle, location) => {
        return {
          basicDetails: basic,
          driverDetails: driver,
          vehicleDetails: vehicle,
          companyDetails: company,
          locationDetails: location,
        };
      });

    combinedData.subscribe((data: any) => {
      const locationDetails = data.locationDetails;
      const endTime = locationDetails[locationDetails.length - 1].time;
      const startTime = new Date(endTime.getTime());
      startTime.setHours(endTime.getHours() - 1);
      const movingStates = locationDetails.filter((location) => location.state === 'moving').map(location => location.time);

      this.details = {
        ...data, ...{
          eventDetails: {
            lat: locationDetails[0].lat,
            lng: locationDetails[0].lng,
            title: 'collision',
            endTime,
            startTime,
            movingStates
          }
        }
      };
    });
  }
}
