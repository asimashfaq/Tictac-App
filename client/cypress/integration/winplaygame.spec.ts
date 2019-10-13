/// <reference types="cypress"/>
import 'cypress-wait-until'
describe('Play Game', () => {
 
  it('should win the game', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: `${Cypress.env('API_SERVER')}/gameplay`,
      response: { id: '123' },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/`)
    cy.get('#box0').click()
    cy.get('#box1').click()
    cy.get('#box2').click()
    cy.get('#box3').click()
    cy.get('#box4').click()
    cy.get('#box5').click()
    cy.get('#box6').click()
    cy.wait(500)
    cy.get('.ant-result-title').should('contain', 'Congraulations!')
  })
  it('should win the game and play again', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: `${Cypress.env('API_SERVER')}/gameplay`,
      response: { id: '123' },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/`)
    cy.get('#box0').click()
    cy.get('#box1').click()
    cy.get('#box2').click()
    cy.get('#box3').click()
    cy.get('#box4').click()
    cy.get('#box5').click()
    cy.get('#box6').click()
    cy.wait(500)
    cy.get('.ant-result-title').should('contain', 'Congraulations!')
    cy.get('#successplay_again').click()
    cy.waitUntil(() => cy.get(`#box0`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box1`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box2`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box3`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box4`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box5`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box6`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box8`).should('contain', '-'))
    cy.waitUntil(() => cy.get(`#box7`).should('contain', '-'))
   
  })
})
