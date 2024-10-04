describe('Floor Page Test', () => {
    it('Should load the floor page', () => {
        // Visit the HTML page
        cy.visit('/floor');
        cy.url().should('include', '/floor');
    });

    it('Should test the create Floor button', () => {
        cy.visit('/floor');
        cy.contains('button', 'Create Floor').click();
        cy.get('[id=floatingFloorNumber]').type('10');
        cy.get('[id=floatingFloorDescription]').type('Test Description');
        cy.get('[id=floatingFloorLength]').type('10');
        cy.get('[id=floatingFloorWidth]').type('10');
        cy.contains('button', 'Create').click();
    });

    it('Should test the update floor button', () => {
        cy.visit('/floor');
        cy.contains('button', 'Update Floor').click();
        cy.get('[id=floatingNewFloorNumber]').type('11');
        cy.get('[id=floatingFloorDescription]').type('Test Description');
        cy.contains('button', 'Update').click();
    });

    it('Should test the list floor button', () => {
        cy.visit('/floor');
        cy.contains('button', 'List Floor').click();
    });


});
