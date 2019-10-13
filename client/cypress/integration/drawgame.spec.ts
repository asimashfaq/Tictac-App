/// <reference types="cypress"/>

describe('Play Game', () => {
 
  it('should win the game', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://0.0.0.0:3000/gameplay',
      response: { id: '123' },
    })
    cy.visit('http://localhost:8080')
    cy.get('#box0').click()
    cy.get('#box8').click()
    cy.get('#box2').click()
    cy.get('#box1').click()
    cy.get('#box5').click()
    cy.get('#box3').click()
    cy.get('#box7').click()
    cy.get('#box6').click()
    cy.get('#box4').click()
    cy.wait(500)
    cy.get('.ant-result-subtitle').should('contain', 'Both players failed')
  })
})
