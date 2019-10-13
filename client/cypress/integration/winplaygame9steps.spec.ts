/// <reference types="cypress"/>
import 'cypress-wait-until'


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
    cy.get('#box6').click()
    cy.get('#box4').click()
    cy.get('#box5').click()
    cy.get('#box7').click()
    cy.get('#box3').click()
    cy.get('#box1').click()
    cy.wait(500)
    cy.get('.ant-result-title').should('contain', 'Congraulations!')
  })

  it('should win the replay game', () => {
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
    cy.get('#box6').click()
    cy.get('#box4').click()
    cy.get('#box5').click()
    cy.get('#box7').click()
    cy.get('#box3').click()
    cy.get('#box1').click()
    cy.wait(500)
    const boxes = []
    cy.get('#box0').then($el => (boxes['box0'] = $el.text()))
    cy.get('#box8').then($el => (boxes['box8'] = $el.text()))
    cy.get('#box2').then($el => (boxes['box2'] = $el.text()))
    cy.get('#box6').then($el => (boxes['box6'] = $el.text()))
    cy.get('#box4').then($el => (boxes['box4'] = $el.text()))
    cy.get('#box5').then($el => (boxes['box5'] = $el.text()))
    cy.get('#box7').then($el => (boxes['box7'] = $el.text()))
    cy.get('#box3').then($el => (boxes['box3'] = $el.text()))
    cy.get('#box1').then($el => (boxes['box1'] = $el.text()))
    cy.wait(2000)
    cy.clock()
    cy.get('.ant-result-title').should('contain', 'Congraulations!')
    cy.get('#successreplay').click()
    cy.tick(1000) // step 0
    cy.waitUntil(() => cy.get(`#box0`).should('contain', boxes['box0']))
    cy.tick(1000) // step 1
    cy.waitUntil(() => cy.get(`#box8`).should('contain', boxes['box8']))
    cy.tick(1000) // step 2
    cy.waitUntil(() => cy.get(`#box2`).should('contain', boxes['box2']))
    cy.tick(1000) // step 3
    cy.waitUntil(() => cy.get(`#box6`).should('contain', boxes['box6']))
    cy.tick(1000) // step 4
    cy.waitUntil(() => cy.get(`#box4`).should('contain', boxes['box4']))
    cy.tick(1000) // step 5
    cy.waitUntil(() => cy.get(`#box5`).should('contain', boxes['box5']))
    cy.tick(1000) // step 6
    cy.waitUntil(() => cy.get(`#box7`).should('contain', boxes['box7']))
    cy.tick(1000) // step 7
    cy.waitUntil(() => cy.get(`#box3`).should('contain', boxes['box3']))
    cy.tick(1000) // step 8
    cy.waitUntil(() => cy.get(`#box1`).should('contain', boxes['box1']))
    cy.tick(1000) // popup
  //  cy.wait(500)
    cy.waitUntil(() => cy.get('.ant-result-title').should('contain', 'Reply End'))
  })
})
