describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Prueba',
      username: 'userPrueba',
      password: 'Pruebita'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('user can login', function () {

      cy.get('input:first').type('userPrueba')
      cy.get('input:last').type('Pruebita')
      cy.contains('login').click()
      cy.contains('Logged in successful')
    })
    it('wrong user cant login', function () {

      cy.get('input:first').type('wrong')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('userPrueba')
      cy.get('input:last').type('Pruebita')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.testurl.com')
      cy.contains('Create').click()
      cy.contains('test blog')
    })

    describe('and a note exists', function () {

      beforeEach(function () {
        cy.contains('create new').click()
        cy.get('#title').type('another test blog')
        cy.get('#author').type('another test author')
        cy.get('#url').type('www.testurl2.com')
        cy.contains('Create').click()
      })

      it('A blog can be liked', function () {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted', function () {
        cy.contains('show').click()
        cy.contains('Delete').click()
        cy.contains('another test blog')
      })



    })

    describe('when many blogs exists and have likes', function () {
      beforeEach(function () {
        cy.contains('create new').click()
        cy.get('#title').type('first blog')
        cy.get('#author').type('fist test author')
        cy.get('#url').type('www.first.com')
        cy.contains('Create').click()

        cy.contains('create new').click()
        cy.get('#title').type('second blog')
        cy.get('#author').type('second test2 author')
        cy.get('#url').type('www.second.com')
        cy.contains('Create').click()

        cy.contains('create new').click()
        cy.get('#title').type('third blog')
        cy.get('#author').type('third test2 author')
        cy.get('#url').type('www.third.com')
        cy.contains('Create').click()
      })

      it('the order of the blogs is ok', function () {

        cy.contains('first blog').parent().contains('show').click()
        cy.contains('first blog').parent().contains('like').click()
        cy.contains('second blog').parent().contains('show').click()
        cy.contains('second blog').parent().contains('like').click()
        cy.contains('second blog').parent().contains('likes 1')
        cy.get('.blog').contains('second blog').parent().contains('like').click()
        cy.get('.blog').contains('second blog').parent().contains('likes 2')
        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'first blog')
      })

    })


  })
})