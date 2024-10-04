describe('Assignment Page Test', () => {
  it('Should load the assignment page', () => {
    // Visit the HTML page
    cy.visit('/assignment');
    cy.url().should('include', '/assignment');
    //Interact with the "Building" button
  });

  it('Should test the create assignment button', () => {
    cy.visit('/assignment');
    cy.contains('button', 'Create Assignment').click();
    cy.get('#startPointSelected').select(0);
    cy.get('#endPointSelected').select(1);
    cy.get('#typeSelected').select(0);
    cy.contains('button', 'Create Assignment').click();
  });

  it('Should test the accept-reject assignment button', () => {
    cy.visit('/assignment');
    cy.contains('button', 'Accept-Reject Assignment').click();

  });

  it('Should test the list all assignment button', () => {
    cy.visit('/assignment');
    cy.contains('button', 'List all Assignment').click();
    cy.get('#selectedOrder').select(0);
  });

  it('Should test the list pending assignment button', () => {
    cy.visit('/assignment');
    cy.contains('button', 'List Pending Assignment').click();
  });

  it('Should test the list pending assignment button', () => {
    cy.visit('/assignment');
    cy.contains('button', 'Assignment Sequence').click();
    cy.get('#selectedAlgorithm').select(0);
  });
});
