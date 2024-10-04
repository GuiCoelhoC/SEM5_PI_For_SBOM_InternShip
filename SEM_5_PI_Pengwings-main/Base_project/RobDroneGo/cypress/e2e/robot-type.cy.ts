describe('Robot Page Test', () => {
  it('Should load the robot type page', () => {
    cy.visit('/robot-type');
    cy.url().should('include', '/robot-type');
  });

  it('Should test the create robot type button', () => {
    cy.visit('/robot-type');
    cy.contains('button', 'Create Robot Type').click();
    cy.get('[id=floatingRobotTypeType]').type('SURVEILLANCE');
    cy.get('[id=floatingRobotTypeBrand]').type('Test Brand');
    cy.get('[id=floatingRobotTypeModel]').type('Test Model');
    cy.contains('button', 'Create Robot Type').click();
  });
});
