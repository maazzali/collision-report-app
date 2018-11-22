import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');
  public data1 = JSON.parse('[{"value":"47.7","time":1542329956000},{"value":"48.0","time":1542329957000},{"value":"48.1","time":1542329958000},{"value":"48.6","time":1542329959000},{"value":"48.2","time":1542329960000},{"value":"47.3","time":1542329961000},{"value":"46.2","time":1542329962000},{"value":"44.7","time":1542329963000},{"value":"43.0","time":1542329964000},{"value":"41.3","time":1542329965000},{"value":"39.6","time":1542329966000},{"value":"38.8","time":1542329967000},{"value":"37.7","time":1542329968000},{"value":"36.7","time":1542329969000},{"value":"36.0","time":1542329970000},{"value":"35.4","time":1542329971000},{"value":"34.2","time":1542329972000},{"value":"33.0","time":1542329973000},{"value":"32.0","time":1542329974000},{"value":"31.8","time":1542329975000},{"value":"31.4","time":1542329976000},{"value":"31.4","time":1542329977000},{"value":"31.7","time":1542329978000},{"value":"32.8","time":1542329979000},{"value":"34.4","time":1542329980000},{"value":"36.9","time":1542329981000},{"value":"38.5","time":1542329982000},{"value":"37.8","time":1542329983000}]');

  constructor() {
    this.data1 = this.data.map((d: any) => ({ ...d, ...{ time: (new Date(d.time)) } }));
    this.data = this.data.map((d: any) => ((new Date(d.time))));
  }

}
