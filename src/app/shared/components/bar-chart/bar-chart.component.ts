import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Label, ThemeService as Ng2ChartsThemeService} from 'ng2-charts';
import {ChartThemeConfig, ThemeService} from '../../../core/services/theme.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as Chart from 'chart.js';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-bar-chart',
  templateUrl: 'bar-chart.component.html',
  styleUrls: ['bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  constructor(private ng2ChartsThemeService: Ng2ChartsThemeService, private themeService: ThemeService) {
  }

  private selectedTheme: Theme = 'light-theme';

  @Input()
  public tooltipTitle = '';
  @Input()
  public tooltipBody = '';
  @Input()
  public tooltipBodyUnits = '';
  @Input()
  public barChartLabels: Label[] = [];
  @Input()
  public barChartData: ChartDataSets[] = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{}]},
    tooltips: {
      backgroundColor: '#ef5350',
      titleFontFamily: 'Lato',
      bodyFontFamily: 'Lato',
      callbacks: {
        title: (item: Chart.ChartTooltipItem[], data: Chart.ChartData) => {
          return this.tooltipTitle + ' : ' + item[0].label;
        },
        label: (tooltipItem: Chart.ChartTooltipItem, data: Chart.ChartData) => {
          return this.tooltipBody + ' : ' + tooltipItem.value + ' ' + this.tooltipBodyUnits;
        }
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  ngOnInit(): void {
    this.themeService.chartThemeConfig.subscribe(config => {
      this.updateThemeBasedOnConfig(config);
    });
  }

  public updateSelectedTheme(value: Theme): void {
    this.selectedTheme = value;
    let overrides: ChartOptions;
    if (this.selectedTheme === 'dark-theme') {
      overrides = {
        legend: {
          labels: {fontColor: 'white'}
        },
        scales: {
          xAxes: [{
            ticks: {fontColor: 'white'},
            gridLines: {color: 'rgba(255,255,255,0.1)'}
          }],
          yAxes: [{
            ticks: {fontColor: 'white'},
            gridLines: {color: 'rgba(255,255,255,0.1)'}
          }]
        }
      };
    } else {
      overrides = {};
    }
    this.ng2ChartsThemeService.setColorschemesOptions(overrides);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.barChartData?.isFirstChange()) {
      this.themeService.chartThemeConfig.pipe(
        take(1)
      ).subscribe(config => {
        this.updateThemeBasedOnConfig(config);
      });
    }
  }

  private updateThemeBasedOnConfig(config: ChartThemeConfig): void {
    this.barChartData.forEach(bcd => {
      bcd.borderColor = config.borderColor;
      bcd.backgroundColor = config.backgroundColor;
      bcd.hoverBackgroundColor = config.hoverBackgroundColor;
    });
    this.updateSelectedTheme(config.isDark ? 'dark-theme' : 'light-theme');
  }
}

type Theme = 'light-theme' | 'dark-theme';
