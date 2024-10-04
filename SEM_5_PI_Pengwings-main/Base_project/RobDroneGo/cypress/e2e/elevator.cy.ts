describe('Elevator Page Test', () => {
  const buildingCode = "Test Building Code";

  const buildingData = {
    id: 1,
    code: buildingCode,
    name: "Test Building Name",
    description: "Test Building Description",
    widthMax: 20,
    lengthMax: 20
  }

  const floorData1 = {
    id: 1,
    building: buildingCode,
    floorNumber: 1,
    description: "Test Floor Description",
    width: 20,
    length: 20
  }

  const floorData2 = {
    id: 2,
    building: buildingCode,
    floorNumber: 2,
    description: "Test Floor Description",
    width: 20,
    length: 20
  }

  const floorDataArray = [floorData1, floorData2];

  const elevatorData = {
    id: 1,
    code: buildingCode + '-E',
    building: buildingCode,
    floors: [1, 2],
    brand: "Test Elevator Brand",
    model: "Test Elevator Model",
    serialNumber: "Test Elevator Serial Number",
    description: "Test Elevator Description",
  };

  beforeEach(() => {
    cy.intercept("GET", "/building", (req) => {
      req.reply(200, buildingData);
    });

    cy.intercept("POST", "/elevator", (req) => {
      // Simulate creating an elevator in the database and return a success response
      req.reply(201, {
        message: "Elevator " + buildingCode + "-E created with success!",
        id: 1,
      });
    });

    cy.intercept("PATCH", "/elevator", (req) => {
      // Simulate updating an elevator in the database and return a success response
      req.reply(200, {
        message: `Elevator update response received!`,
        id: 1,
      });
    });

    // simulating other required functions
    cy.intercept("GET", "/elevator?building=" + buildingCode, (req) => {
      req.reply(200, elevatorData);
    });

    cy.intercept("GET", "/elevator/all", (req) => {
      req.reply(200, elevatorData);
    });

    cy.intercept("GET", "/floor?building=" + buildingCode, (req) => {
      req.reply(200, floorDataArray);
    });

    cy.visit('/elevator');

  });

  it('Should load the elevator page', () => {
    // Visit the HTML page
    cy.url().should('include', '/elevator');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'RobDroneGo');
  });
/*
  it('Should test the create Elevator button', () => {
    cy.contains('button', 'Create Elevator').click();
    const createButton = cy.get('button.submit-button');

    cy.get('#buildingSelected').select(buildingData.code);
    cy.get('div.form-building').should('be.visible');

    cy.get('input[type="checkbox"]:first').click();
    cy.get('input[type="checkbox"]:last').click();
    cy.get('div#floorSelection input[type="checkbox"]:checked').should('have.length', 2);

    cy.get('input[id="brand"]').type(elevatorData.brand);
    cy.get('input[id="model"]').type(elevatorData.model);
    cy.get('input[id="serialNumber"]').type(elevatorData.serialNumber);
    cy.get('input[id="description"]').type(elevatorData.description);

    createButton.click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Elevator " + buildingCode + "-E created with success!`)
    });
  });

  it('Should test the update Elevator button', () => {
    cy.contains('button', 'Update Elevator').click();
    const updateButton = cy.get('button.submit-button');

    cy.get('#buildingSelected').select(elevatorData.building);
    cy.get('div.form-floating').should('be.visible');

    cy.get('input[type="checkbox"]:first').click();

    cy.get('div#floorSelection input[type="checkbox"]:checked').should('have.length', 1);

    cy.get('input[id="brand"]').type('Updated Elevator Brand');
    cy.get('input[id="model"]').type('Updated Elevator Model');
    cy.get('input[id="serialNumber"]').type('New Serial Number');
    cy.get('input[id="description"]').type('Elevator description update');

    updateButton.click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Elevator update response received!`)
    });
  });

  it('Should test the list Elevator button', () => {
    cy.contains('button', 'List Elevator').click();
    cy.get('#selectedBuilding').select(buildingData.code);

    cy.get('main.list-elevators.h1').should('contain', 'Elevators on the database:');
    cy.get('main.list-elevators.card-container').should('have.length.greaterThan', 0);

    cy.get('main.list-elevators.card-container').each((elevator) => {
      cy.get('strong').should('contain', elevatorData.code);
      cy.get('strong').should('contain', elevatorData.building);
      cy.get('strong').should('contain', elevatorData.floors);
      cy.get('strong').should('contain', elevatorData.brand);
      cy.get('strong').should('contain', elevatorData.model);
      cy.get('strong').should('contain', elevatorData.serialNumber);
      cy.get('strong').should('contain', elevatorData.description);
    });
  });
 */
});
