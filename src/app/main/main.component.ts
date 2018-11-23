import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public details: any = {};
  public data = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');
  public data1 = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');

  constructor() {
    this.details.lat = 0;
    this.details.lng = 0;
    this.details.title = 'collision';
    this.details.mapData = [];
    this.data1 = this.data.map((d: any) => ({ ...d, ...{ time: (new Date(d.time)) } }));
    this.data = this.data.map((d: any) => ((new Date(d.time))));
  }

  public ngOnInit() {
    this.details.mapData = [
      {lat: 33.6734935, lng: 73.024163, bearing: 51.78, locatedAtUserTZ: 'Thu Dec 14 2017 05:45:24 GMT+0500 (Pakistan Standard Time)'},
      {lat: 33.6734907, lng: 73.024157, bearing: 50.71, locatedAtUserTZ: 'Thu Dec 14 2017 05:45:29 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6735512, lng: 73.0242599, bearing: 64.5, locatedAtUserTZ: 'Thu Dec 14 2017 05:47:52 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6765007, lng: 73.03001, bearing: 58.07, locatedAtUserTZ: 'Thu Dec 14 2017 05:48:53 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.679109, lng: 73.0349783, bearing: 57.84, locatedAtUserTZ: 'Thu Dec 14 2017 05:49:53 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6800451, lng: 73.0367707, bearing: 59.95, locatedAtUserTZ: 'Thu Dec 14 2017 05:50:09 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6806345, lng: 73.0396291, bearing: 56.5, locatedAtUserTZ: 'Thu Dec 14 2017 05:50:53 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6833687, lng: 73.0449945, bearing: 55.96, locatedAtUserTZ: 'Thu Dec 14 2017 05:51:30 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6842919, lng: 73.0465243, bearing: 52.95, locatedAtUserTZ: 'Thu Dec 14 2017 05:51:41 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6854561, lng: 73.0484213, bearing: 57.76, locatedAtUserTZ: 'Thu Dec 14 2017 05:51:54 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6854739, lng: 73.0495203, bearing: 117.23, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:01 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6845752, lng: 73.0501027, bearing: 184.65, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:09 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.683896, lng: 73.0497815, bearing: 208.27, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:14 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6816566, lng: 73.0501692, bearing: 148.38, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:32 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6808576, lng: 73.0507527, bearing: 148.83, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:39 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6805084, lng: 73.0510033, bearing: 149.33, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:42 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.679053, lng: 73.0520618, bearing: 148.06, locatedAtUserTZ: 'Thu Dec 14 2017 05:52:54 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6782558, lng: 73.0526601, bearing: 147.66, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:00 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6779748, lng: 73.0528736, bearing: 147.89, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:02 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6769323, lng: 73.0536609, bearing: 147.89, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:09 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6767856, lng: 73.0537742, bearing: 147.46, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:10 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6756256, lng: 73.0546558, bearing: 148.04, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:19 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6750508, lng: 73.0550742, bearing: 149.9, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:22 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6706416, lng: 73.0583982, bearing: 148.62, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:53 GMT+0500 (Pakistan Standard Time)'}
      , {lat: 33.6703978, lng: 73.0585801, bearing: 147.99, locatedAtUserTZ: 'Thu Dec 14 2017 05:53:55 GMT+0500 (Pakistan Standard Time)'}
    ];
  }
}
