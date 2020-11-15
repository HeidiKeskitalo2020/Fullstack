describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Heidi Keskitalo',
      username: 'HeidiK',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is showm', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('HeidiK')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Heidi Keskitalo logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('HeidiK')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('HeidiK')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Blog created by cypress')
      cy.get('#author').type('Heidi K.')
      cy.get('#url').type('www.HeidiCypressBlogs.com')
      cy.get('#newBlogCreate').click()

      cy.contains('Blog created by cypress')
      cy.contains('www.HeidiCypressBlogs.com')
      cy.contains('A new blog "Blog created by cypress" by Heidi K. created.')
    })
    it('A blog can be liked', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Blog created by cypress')
      cy.get('#author').type('Heidi K.')
      cy.get('#url').type('www.HeidiCypressBlogs.com')
      cy.get('#newBlogCreate').click()
      cy.contains('view').click()

      cy.get('#likesButton').click()
      cy.get('#likes').contains(1)

      cy.get('#likesButton').click()
      cy.get('#likes').contains(2)
    })

  })

})

