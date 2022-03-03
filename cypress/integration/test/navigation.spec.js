describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit root", () => {});

  it("should navigate to tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    cy.get(':nth-child(1) > .appointment__add').click()
    cy.get('[data-testid="student-name-input"]').type('john')
    cy.get('.interviewers__item:first').click()
    cy.get(".button--confirm").click()
    cy.get(':nth-child(1) > .appointment__card').should('be.visible')
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    cy.get('.appointment__actions>.appointment__actions-button').eq(0).click({force: true})
    cy.get('[data-testid="student-name-input"]').type('{selectAll} {backspace} hello')
    cy.get('.interviewers__item').eq(1).click()
    cy.get(".button--confirm").click()
    cy.get(':nth-child(1) > .appointment__card').should('be.visible')
  });

  it("should cancel an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    cy.get('.appointment__actions>.appointment__actions-button').eq(1).click({force: true})
    cy.get('.appointment__card > .appointment__actions > :nth-child(2)').click()
  });
});
