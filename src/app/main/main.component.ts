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
  public data = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');
  public data1 = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');

  constructor(private mainService: MainService) {
    this.data1 = this.data.map((d: any) => ({ ...d, ...{ time: (new Date(d.time)) } }));
    this.data = this.data.map((d: any) => ((new Date(d.time))));

  }

  public ngOnInit() {
    const companyData = this.mainService.getJSON('company');
    const driverData = this.mainService.getJSON('driver');
    const vehicleData = this.mainService.getJSON('vehicle');
    const locationData = this.mainService.getJSON('location');
    const eventData = this.mainService.getJSON('event');
    const combinedData = combineLatest(companyData, driverData, vehicleData, locationData, eventData,
      (company, driver, vehicle, location, event) => {
        return {
          driverDetails: driver,
          vehicleDetails: vehicle,
          companyDetails: company,
          locationDetails: location,
          eventDetails: event,
        };
      });
    combinedData.subscribe(data => {
      // TODO:: prepost value is missing in the event
      const prepost = 10; // seconds
      const eventTime = new Date(data.eventDetails.timestamp);
      this.details = {
        ...data, ...{
          lat: 0,
          lng: 0,
          title: 'collision',
          eventStart: (new Date(eventTime.setSeconds(eventTime.getSeconds() - prepost))),
          eventEnd: (new Date(eventTime.setSeconds(eventTime.getSeconds() + prepost)))
        }
      };
      console.log(this.details);
    });
  }
}
