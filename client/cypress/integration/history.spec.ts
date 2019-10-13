/// <reference types="cypress"/>
import 'cypress-wait-until'

describe('Game Plays History', () => {
  it('should show no data message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      status: 404,
      url: 'http://0.0.0.0:3000/gameplays',
      response: {
        message: 'No Data found',
      },
    })
    cy.visit('http://localhost:8080/history')
    cy.get('.msg').should('contain', 'No data to load')
  })
  it('should show the loading message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      delay: 5000,
      url: 'http://0.0.0.0:3000/gameplays',
      response: {
        message: 'No Data found',
      },
    })
    cy.visit('http://localhost:8080/history')
    cy.get('.ant-layout-content > div').should('contain', 'Loading')
  })
  it('should show error message', () => {
    cy.server()
    cy.route({
      method: 'GET',
      status: 503,
      url: 'http://0.0.0.0:3000/gameplays',
      response: {
        message: 'Some thing went wrong',
      },
    })
    cy.visit('http://localhost:3001/history')
    cy.get('.errorMsg').should('contain', 'Request failed with status code 503')
  })
  it('should show the data', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://0.0.0.0:3000/gameplays',
      response: 'fixture:gameplays.json',
    })
    cy.visit('http://localhost:3001/history')
    cy.get('.ant-table-row').should($el => {
      expect($el.length).to.be.eq(4)
    })
  })
})
