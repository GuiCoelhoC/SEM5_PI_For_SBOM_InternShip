describe('Passage Page Test', () => {
  it('should load the Passage page', () => {
    cy.visit('/passage');
    cy.url().should('include', '/passage');
  });
  it ('should test the create Passage button', () => {
    cy.visit('/passage');
    cy.contains('button', 'Create Passage').click();
    cy.get('[id=floatingPassageCode]').type('A100');
    cy.get('[id=floatingPassageFloor1]').type('1');
    cy.get('[id=floatingPassageFloor2]').type('3');
    cy.get('[id=floatingPassageBuilding1]').type('A2343');
    cy.get('[id=floatingPassageBuilding2]').type('A1234');
    cy.contains('button', 'Create Passage').click();
  });

  it('should test the update Passage button', () => {
    cy.visit('/passage');
    cy.contains('button', 'Update Passage').click();
    cy.get('[id=floatingPassageCode]').type('A100');
    cy.get('[id=floatingPassageFloor1]').type('1');
    cy.get('[id=floatingPassageFloor2]').type('3');
    cy.get('[id=floatingPassageBuilding1]').type('A2343');
    cy.get('[id=floatingPassageBuilding2]').type('TST4');
    cy.contains('button', 'Update Passage').click();
  });

  it('should test the list Passage button', () => {
    cy.visit('/passage');
    cy.contains('button', 'Show List of Passage').click();
    cy.get('#selectedBuilding').select('A2343');
    cy.get('#selectedBuilding2').select('A1234');
  });
});
