describe("Creating, editing and deleting Issue time-tracking", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.url()
        .should("eq", `${Cypress.env("baseUrl")}project/board`)
        .then(() => {
          cy.visit("/board");
          cy.contains("This is an issue of type: Task.").click();
        });
    });
  
    const issueTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const issueDetailsModal = () =>
      cy.get('[data-testid="modal:issue-details"]');
  
    it("Clearing, editing and deleting Issue time-tracking estimation", () => {

        const originalEstimation = "15";
        const newEstimation = "25";

      issueDetailsModal().within(() => {
       
        cy.get('input[placeholder="Number"]').clear().type(originalEstimation);
        cy.contains(originalEstimation)
          .scrollIntoView()
          .should("be.visible");
        cy.contains(`${originalEstimation}h estimated`)
          .scrollIntoView()
          .should("be.visible");
        
        cy.get('input[placeholder="Number"]').clear().type(newEstimation);
        cy.contains(newEstimation).should("be.visible");
        cy.contains(originalEstimation).should("not.be.visible");
        cy.contains(`${newEstimation}h estimated`).should("be.visible");
  
        cy.get('input[placeholder="Number"]').clear();
        cy.contains(newEstimation).should("not.exist");
        cy.contains(`${newEstimation}h estimated`).should("not.exist");
      });
    });
  
    it("Adding, editing and removing time spent on an issue", () => {

    const timeSpent = "10";
    const timeRemaining = "20";

        cy.get('[data-testid="icon:stopwatch"]').click();
        issueTrackingModal().should("be.visible");
        issueTrackingModal().within(() => {
          cy.get('input[placeholder="Number"]').first().clear().type(timeSpent);
          cy.get('input[placeholder="Number"]').last().clear().type(timeRemaining);
        });
    
        issueTrackingModal()
          .find("button")
          .contains("Done")
          .click()
          .should("not.exist");

        issueDetailsModal().should("be.visible");
        cy.contains("No time logged").should("not.exist");
        cy.contains(`${timeSpent}h logged`).should("be.visible");
        cy.contains(`${timeRemaining}h remaining`).should("be.visible");
    
        cy.get('[data-testid="icon:stopwatch"]').click();
        issueTrackingModal()
          .should("be.visible")
          .within(() => {
            cy.get('input[placeholder="Number"]').first().clear();
            cy.get('input[placeholder="Number"]').last().clear();
          });
    
        issueTrackingModal()
          .find("button")
          .contains("Done")
          .click()
          .should("not.exist");
        issueDetailsModal().should("be.visible");
        cy.contains("No time logged").should("be.visible");
      });
    });