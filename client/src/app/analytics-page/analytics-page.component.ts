import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain', {static: false}) gainRef: ElementRef;
  @ViewChild('order', {static: false}) orderRef: ElementRef;
  aSub: Subscription;
  average: number;
  pending = true;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
    };

    this.aSub = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      // **** temp Gain/Order****
      // gainConfig.labels.push('08.05.2008');
      // gainConfig.labels.push('09.05.2008');
      // gainConfig.data.push(1500);
      // gainConfig.data.push(700);

      // orderConfig.labels.push('08.05.2008');
      // orderConfig.labels.push('09.05.2008');
      // orderConfig.data.push(8);
      // orderConfig.data.push(2);
      // **** temp Gain/Order****

      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      orderCtx.canvas.height = '300px';
      gainCtx.canvas.height = '300px';
      new Chart(orderCtx, createChartConfig(orderConfig));
      new Chart(gainCtx, createChartConfig(gainConfig));
      this.pending = false;
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
