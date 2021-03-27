describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Dipak Chaudhari',
      username: 'iceman_1212',
      password: 'hunter2'
    })
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'iceman_1212',
        password: 'hunter2'
      })
    })

    it('a blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#blog-title').type('Rants, Raves and Ideas on Getting Bigger and Stronger')
      cy.get('#blog-author').type('Mythical Strength')
      cy.get('#blog-url').type('https://mythicalstrength.blogspot.com/')
      cy.get('#submit-blog').click()

      cy.contains('Rants, Raves and Ideas on Getting Bigger and Stronger')
    })
    it('a user can like a blog', function () {
      cy.addBlog({
        title: 'dchaudh blog',
        author: 'dchaudh',
        url: 'dchaudh.io'
      })

      cy.contains('view').click()
      cy.contains('like').click()
      cy.wait(1000)
      cy.get('.likes').contains('1')
    })
    it('a user can delete own blog', function () {
      cy.addBlog({
        title: 'dchaudh blog',
        author: 'dchaudh',
        url: 'dchaudh.io'
      })

      cy.get('html').should('not.contain', 'dchaudh blog')
    })

    it.only('blogs are listed in decreasing order of likes', () => {
      cy.addBlog({
        title: 'dchaudh blog',
        author: 'dchaudh',
        url: 'dchaudh.io',
        likes: 1,
      })
      cy.addBlog({
        title: 'iceman blog',
        author: 'iceman',
        url: 'iceman.io',
        likes: 2,
      })
      cy.addBlog({
        title: 'fullna blog',
        author: 'fullna',
        url: 'fullna.io',
        likes: 3,
      })
      cy.visit('http://localhost:3000')
      const correctOrder = ['3', '2', '1']
      cy.get('.likes').should((likes) => {
        const realizedOrder = likes.map((i, like) => like.innerText).toArray()
        console.log(realizedOrder)
        expect(realizedOrder).to.deep.eq(correctOrder)
      })
      // cy.get('.likes').each((like, i) => {
      //   expect(like.text()).to.equal(correctOrder[i])
      // })

    })
  })
})