export class Crumb {
  column: string;
  value: boolean;
  text: string;

  constructor(obj?: any) {
    if (!obj) {
      obj = {};
    }
    this.column = obj.column;
    this.value = obj.value;
    this.text = obj.text || '';
  }

}
