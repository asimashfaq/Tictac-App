/// <reference types="cypress"/>
import 'cypress-wait-until'

describe('Game Plays History', () => {
  it('should show no data message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      status: 404,
      url: `${Cypress.env('API_SERVER')}/gameplays`,
      response: {
        message: 'No Data found',
      },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/history`)
    cy.get('.msg').should('contain', 'No data to load')
  })
  it('should show the loading message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      delay: 5000,
      url: `${Cypress.env('API_SERVER')}/gameplays`,
      response: {
        message: 'No Data found',
      },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/history`)
    cy.get('.ant-layout-content > div').should('contain', 'Loading')
  })
  it('should show error message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      status: 503,
      url: `${Cypress.env('API_SERVER')}/gameplays`,
      response: {
        message: 'Some thing went wrong',
      },
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/history`)
    cy.get('.errorMsg').should('contain', 'Request failed with status code 503')
  })
  it('should show the data', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: `${Cypress.env('API_SERVER')}/gameplays`,
      response: 'fixture:gameplays.json',
    })
    cy.visit(`${Cypress.env('CLIENT_SERVER')}/history`)
    cy.get('.ant-table-row').should($el => {
      expect($el.length).to.be.eq(4)
    })
  })
})
