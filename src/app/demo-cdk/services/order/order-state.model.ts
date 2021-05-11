import {DomainEntity} from '../../../shared/model/domain.model';
import {Order} from '../../../shared/model/order.model';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {Sort} from '@angular/material/sort';

export interface OrderState extends DomainEntity<Array<Order>> {
  sort: Sort,
  dateFilter: {
    minDate: number,
    selectedMinDate: number,
    maxDate: number,
    selectedMaxDate: number
  };
}

export interface ChartState {
  label: Label[];
  data: ChartDataSets[];
}
