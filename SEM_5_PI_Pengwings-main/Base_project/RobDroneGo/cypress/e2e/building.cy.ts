describe('Building Page Test', () => {
    it('Should load the building page', () => {
        // Visit the HTML page
        cy.visit('/building');
        cy.url().should('include', '/building');
        //Interact with the "Building" button
    });

    it('Should test the create building button', () => {
        cy.visit('/building');
        cy.contains('button', 'Create Building').click();
        cy.get('[id=floatingBuildingCode]').type('Test Building Code');
        cy.get('[id=floatingBuildingName]').type('Test Building Name');
        cy.get('[id=floatingBuildingDescription]').type('Test Description');
        cy.get('[id=floatingBuildingWidthMax]').type('100');
        cy.get('[id=floatingBuildingLengthMax]').type('150');
        cy.contains('button', 'Create Building').click();
    });

    it('Should test the update building button', () => {
        cy.visit('/building');
        cy.contains('button', 'Update Building').click();
        cy.get('[id=floatingBuildingName]').type('Test Building Name Updated');
        cy.get('[id=floatingBuildingDescription]').type('Test Description');
        cy.get('[id=floatingBuildingWidthMax]').type('100');
        cy.get('[id=floatingBuildingLengthMax]').type('150');
        cy.contains('button', 'Update Building').click();

    });

    it('Should test the list building button', () => {
        cy.visit('/building');
        cy.contains('button', 'List Building').click();
    });

    it('Should test the list min max building button', () => {
        cy.visit('/building');
        cy.contains('button', 'List Min').click();
        cy.get('[id=floatingMin]').type('0');
        cy.get('[id=floatingMax]').type('100');
        cy.contains('button', 'List Buildings').click();
    });






});
