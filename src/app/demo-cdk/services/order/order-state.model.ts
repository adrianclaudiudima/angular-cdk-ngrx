import {DomainEntity} from '../../../shared/model/domain.model';
import {Order} from '../../../shared/model/order.model';
import {Moment} from 'moment';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';

export interface OrderState extends DomainEntity<Array<Order>> {
  filteredOrders: Array<Order>;
  dateFilter: {
    minDate: Moment,
    selectedMinDate: Moment,
    maxDate: Moment,
    selectedMaxDate: Moment
  };
}

export interface ChartState {
  label: Label[];
  data: ChartDataSets[];
}
