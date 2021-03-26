describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request({
      url: 'http://localhost:3003/api/users/',
      method: 'POST',
      body: {
        name: 'Dipak Chaudhari',
        username: 'iceman_1212',
        password: 'hunter2'
      }
    })
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('able to login with valid username and password', function () {
    cy.get('#username').type('iceman_1212')
    cy.get('#password').type('hunter2')
    cy.get('#login-button').click()
    cy.get('#user-display').should('contain', 'iceman_1212 logged in')
  })

  it('rejects login attempt with invalid username and password', function () {
    cy.get('#username').type('iceman_1212')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.errorNotification')
      .should('contain', 'wrong username or password')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})