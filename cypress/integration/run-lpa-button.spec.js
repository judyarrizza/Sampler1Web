// describe('Testing the Run LPA button', () => {
//   beforeEach(() => {
//     cy.visit('/?loanId=1_MTG_95D69857-4578-4A11-9662-7679F1B1C26E');
//   });
//   it('should navigate to LPA tab from Validate tab', () => {
//     cy.server();

//     cy.route('POST', 'https://automatedunderwritingapi-qa1.loandepotdev.works/api/v1/mortgage/**').as('getMortgage');
//     cy.route('GET', 'https://automatedunderwritingapi-qa1.loandepotdev.works/api/v1/desktop-underwriter/**').as('getDesktopUnderwriterOptions');
//     cy.route('POST', 'https://automatedunderwritingapi-qa1.loandepotdev.works/api/v1/loan-product-advisor/**').as('runLoanProductAdvisor');

//     cy.wait('@getMortgage').then(() => {
//       cy.wait('@getDesktopUnderwriterOptions');
//     });

//     cy.get('button:contains("Run LPA Only")').click();

//     cy.get('button:contains("Next")').click();

//     cy.wait('@runLoanProductAdvisor');
//   });
// });
