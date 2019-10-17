export class Provider {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  fees: boolean;
  approved: boolean;
  selected?: boolean;

  constructor(obj?: any) {
    if (!obj) {
      obj = {};
    }
    this.id = obj.id || 'DEFAULT';
    this.name = obj.name || '';
    this.address = obj.address || '';
    this.city = obj.city || '';
    this.state = obj.state || '';
    this.zip = obj.zip || '';
    this.fees = obj.fees || false;
    this.approved = obj.approved || false;
    this.selected = obj.selected || false;
  }

}
