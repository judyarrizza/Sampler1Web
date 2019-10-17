export class StateFilter {
  state: string;
  selected: boolean;

  constructor(state?: string, selected?: boolean) {
    this.state = state || 'XX';
    this.selected = selected || true;
  }

}

export class Filters {
  approved: boolean;
  totalApproved: number;
  notApproved: boolean;
  totalNotApproved: number;
  available: boolean;
  totalAvailable: number;
  notAvailable: boolean;
  totalNotAvailable: number;
  states: string;
  statesList: Array<StateFilter>;

  constructor(obj?: any) {
    if (!obj) {
      obj = {};
    }
    this.approved = obj.approved || true;
    this.totalApproved = obj.totalApproved || 0;
    this.notApproved = obj.notApproved || false;
    this.totalNotApproved = obj.totalNotApproved || 0;

    this.available = obj.available || true;
    this.totalAvailable = obj.totalAvailable || 0;
    this.notAvailable = obj.notAvailable || false;
    this.totalNotAvailable = obj.totalNotAvailable || 0;

    this.states = obj.states || 'all';
    this.statesList = [
      new StateFilter('Al'),
      new StateFilter('AK'),
      new StateFilter('AZ'),
      new StateFilter('AR'),
      new StateFilter('CA'),
      new StateFilter('CO'),
      new StateFilter('CT'),
      new StateFilter('DE'),
      new StateFilter('FL'),
      new StateFilter('GA'),
      new StateFilter('HI'),
      new StateFilter('ID'),
      new StateFilter('IL'),
      new StateFilter('IN'),
      new StateFilter('IA'),
      new StateFilter('KS'),
      new StateFilter('KY'),
      new StateFilter('LA'),
      new StateFilter('ME'),
      new StateFilter('MD'),
      new StateFilter('MA'),
      new StateFilter('MI'),
      new StateFilter('MN'),
      new StateFilter('MS'),
      new StateFilter('MO'),
      new StateFilter('MT'),
      new StateFilter('NE'),
      new StateFilter('NV'),
      new StateFilter('NH'),
      new StateFilter('NJ'),
      new StateFilter('NM'),
      new StateFilter('NY'),
      new StateFilter('NC'),
      new StateFilter('ND'),
      new StateFilter('OH'),
      new StateFilter('OK'),
      new StateFilter('OR'),
      new StateFilter('PA'),
      new StateFilter('RI'),
      new StateFilter('SC'),
      new StateFilter('SD'),
      new StateFilter('TN'),
      new StateFilter('TX'),
      new StateFilter('UT'),
      new StateFilter('VT'),
      new StateFilter('VA'),
      new StateFilter('WA'),
      new StateFilter('WV'),
      new StateFilter('WI'),
      new StateFilter('WY')
    ];

  }

}
