describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //Assignment #2
  //Test Case 1: Custom isssue creation

  it("Should create an issue and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type("My bug description");
      cy.get(".ql-editor").should("have.text", "My bug description");

      cy.get('input[name="title"]').type("Bug");
      cy.get('input[name="title"]').should("have.value", "Bug");

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:bug"]').should("be.visible");

      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Highest");

      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
            cy.get('[data-testid="icon:bug"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("Bug")
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
        cy.get('[data-testid="icon:bug"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });
});

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //Test Case 2:Random Data Plugin Issue Creation

  it("Should create an issue and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type(
        "I am really bad @ creating descriptions, so here are some &%#=P?"
      );
      cy.get(".ql-editor").should(
        "have.text",
        "I am really bad @ creating descriptions, so here are some &%#=P?"
      );

      cy.get('input[name="title"]').type("Blues");
      cy.get('input[name="title"]').should("have.value", "Blues");

      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Low"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Low");

      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Blues")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Baby Yoda"]').should("be.visible");
            cy.get('[data-testid="icon:task"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("Blues")
      .within(() => {
        cy.get('[data-testid="avatar:Baby Yoda"]').should("be.visible");
        cy.get('[data-testid="icon:task"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });
});
