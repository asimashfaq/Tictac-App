/// <reference types="cypress"/>
import 'cypress-wait-until'

describe('Game Play ', () => {
  it('should show no data message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      status: 404,
      url: `${Cypress.env('API_SERVER')}/gameplay/1`,
      response: {
        message: 'No Data found',
      },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/replay/1`)
    cy.get('.errorMsg').should('contain', 'Unable to Load Data')
  })

  it('should show the data', () => {
    cy.clock()
    cy.server()
    cy.route({
      method: 'GET',
      url: `${Cypress.env('API_SERVER')}/gameplay/1`,
      response: 'fixture:gameplay.json',
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/replay/1`)
    cy.tick(1000)
    cy.get('#box0').should('contain', 'x')
    cy.tick(1000)
    cy.get('#box1').should('contain', 'o')
    cy.tick(1000)
    cy.get('#box2').should('contain', 'x')
    cy.tick(1000)
    cy.get('#box3').should('contain', 'o')
    cy.tick(1000)
    cy.get('#box4').should('contain', 'x')
    cy.tick(1000)
    cy.get('#box5').should('contain', 'o')
    cy.tick(1000)
    cy.get('#box6').should('contain', 'x')
  })
})
