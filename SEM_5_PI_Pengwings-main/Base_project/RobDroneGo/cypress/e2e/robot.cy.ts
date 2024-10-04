describe('Robot Page Test', () => {
  it('Should load the robot page', () => {
    cy.visit('/robot');
    cy.url().should('include', '/robot');
  });

  it('Should test the create robot button', () => {
    cy.visit('/robot');
    cy.contains('button', 'Create Robot').click();
    cy.get('[id=floatingRobotCode]').type('A2343');
    cy.get('[id=floatingRobotName]').type('Test Name');
    cy.get('[id=floatingRobotSerialNumber]').type('A2343');
    cy.get('[id=floatingRobotDescription]').type('Test Description');
    cy.contains('button', 'Create').click();
  });

  it('Should test the Inhibit robot button', () => {
    cy.visit('/robot');
    cy.contains('button', 'Inhibit Robot').click();
    cy.contains('button', 'Inhibit Robot').click();
  });

  it('Should test the list robot button', () => {
    cy.visit('/robot');
    cy.contains('button', 'List Robot').click();
  });

});
