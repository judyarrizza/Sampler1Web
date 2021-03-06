import { Injectable } from '@angular/core';

@Injectable()
export class MockService {

  constructor() { }

  getMockApiToken() {
    return {
      body: {
        Token: 'MOCK-API-TOKEN'
      }
    };
  }

  getMockProviders() {
    const newData = Object.assign({}, this.providerData);
    const len = newData.providers.length;
    const newProviders: Array<any> = [];
    for (let j = 0; j < 1; j++) {
      for (let i = 0; i < len; i++) {
        const rec = Object.assign({}, newData.providers[i], {
          id: (j*100) + i + 1,
        });
        rec.name = newData.providers[i].name + '(' + rec.id + ')';
        newProviders.push(rec);
      }
    }
    newData.providers = newProviders;
    return (newData);
  }

  providerData =
    {
      "headerText": 'Settlement',
      "selected": 4,
      "providers": [
        { id: 1, name: 'Closing Xperts', address: '3220 El Camino Real', city: 'Victor',  state: 'NY', zip: '14564', 'fees': true, 'approved': false},
        { id: 2, name: 'Arms-length Acquisitions', address: '7665 Omnitech Place', city: 'San Diego',  state: 'CA', zip: '92030', 'fees': false, 'approved': true},
        { id: 3, name: 'Another Provider', address: '142 Arden Road', city: 'Del Mar',  state: 'CA', zip: '92014', 'fees': true, 'approved': true},
        { id: 4, name: '1st Tier Provider', address: '2 Glenn Ave', city: 'Zap',  state: 'MN', zip: '12000', 'fees': false, 'approved': true},
        { id: 5, name: 'Dunbar USA', address: '22 Orchard Ave', city: 'Bing',  state: 'WA', zip: '14301', 'fees': false, 'approved': true},
        { id: 6, name: '100 Providers', address: '18 Emu Lane', city: 'Almond',  state: 'OR', zip: '12004', 'fees': true, 'approved': true},
        { id: 7, name: 'Everyman', address: '3812 Aardvark Road', city: 'Cantally',  state: 'TN', zip: '21876', 'fees': true, 'approved': true},
        { id: 8, name: 'Service Link', address: '#1 Dennyview ', city: 'Fing',  state: 'WA', zip: '13411', 'fees': false, 'approved': false},
        { id: 9, name: 'iClose Escrow', address: '399 East Center Road', city: 'Signal',  state: 'NV', zip: '20309', 'fees': false, 'approved': true},
        { id: 10, name: 'Big Provider', address: '12874 Longroad Division of Central Clockworks Avenue West', city: 'Crumb',  state: 'AZ', zip: '28765', 'fees': true, 'approved': false},
        { id: 11, name: 'First American Title', address: '45 Fannyview', city: 'Normal',  state: 'DE', zip: '13098', 'fees': true, 'approved': false},
        { id: 12, name: 'Catch a Provider', address: '288 Range Rover Ave', city: 'Abercrombe',  state: 'NC', zip: '10321', 'fees': true, 'approved': true},
        { id: 13, name: 'Long Name For a Provider to test wrap', address: '14 Drew Place', city: 'Farnsworth',  state: 'SC', zip: '11833', 'fees': false, 'approved': true},
        { id: 14, name: 'Big Group Providers', address: '79 Evening Avenue', city: 'Juggle',  state: 'NM', zip: '18176', 'fees': true, 'approved': true},
        { id: 15, name: 'USA Providers', address: '223 West Angle Street', city: 'Lemon Grove',  state: 'OR', zip: '18444', 'fees': true, 'approved': true},
        { id: 16, name: 'King of Title', address: '#443, 13 Rocket Crescent', city: 'Van Nuyes',  state: 'NJ', zip: '12681', 'fees': false, 'approved': false},
        { id: 17, name: '17 Gateway Group', address: '702 Playground Way', city: 'Sand Ridge',  state: 'MD', zip: '16765', 'fees': true, 'approved': true},
        { id: 18, name: 'Closing USA', address: '12 Orange Plate Ave', city: 'Victor',  state: 'NY', zip: '14564', 'fees': true, 'approved': false},
        { id: 19, name: 'Heavenly Provider', address: '887 Zantac Road', city: 'Wambat',  state: 'DE', zip: '12111', 'fees': true, 'approved': true},
        { id: 20, name: 'Numbered Right Provider', address: '183 Kanban Circle', city: 'Farview',  state: 'CA', zip: '18444', 'fees': true, 'approved': true},
        { id: 21, name: 'Prince of Title', address: '#443, 16 Vane Crescent', city: 'Van Nuyes',  state: 'CA', zip: '12681', 'fees': true, 'approved': true},
        { id: 22, name: 'All Gateway Group', address: '104 Locklear Way', city: 'Sand Ridge',  state: 'MD', zip: '16765', 'fees': true, 'approved': true},
        { id: 23, name: 'Providers Zone USA', address: '12 Fray Ave', city: 'Victor',  state: 'NY', zip: '14564', 'fees': true, 'approved': true},
        { id: 25, name: 'A-One Providers', address: '887 Pigeon Road', city: 'Wambat',  state: 'DE', zip: '12111', 'fees': true, 'approved': true},
        { id: 25, name: 'District 4 Provider', address: '183 Janek', city: 'Smartie',  state: 'CA', zip: '18444', 'fees': true, 'approved': true}

      ]
    };
}
