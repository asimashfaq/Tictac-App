/// <reference types="cypress"/>

describe('Game', () => {
  it('should initialize the game', () => {
    cy.visit('http://localhost:8080')
    cy.get('#box0').should('contain', '-')
    cy.get('#box1').should('contain', '-')
    cy.get('#box2').should('contain', '-')
    cy.get('#box3').should('contain', '-')
    cy.get('#box4').should('contain', '-')
    cy.get('#box5').should('contain', '-')
    cy.get('#box6').should('contain', '-')
    cy.get('#box7').should('contain', '-')
    cy.get('#box8').should('contain', '-')
  })
  it('should click on the button', () => {
    cy.get('#box0').click()
    cy.get('#box0').should($el => {
      expect($el.text() === 'x' || $el.text() === `o`).to.be.true
    })
  })
})
