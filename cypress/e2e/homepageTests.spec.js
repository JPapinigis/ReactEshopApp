
describe ('HomepageTests', () => {

  it('homepage elements', () => {
    cy.visit('/')

    cy.get('header')
        .find('div')
        .children()
        .should('have.length', 2)

    cy.get('header')
        .find('p')
        .should('include.text','Items in Cart:')

    cy.get('header')
        .find('a')
        .should('include.text','To cart')

    cy.get('header')
        .find('a').click()
    cy.location('pathname').should('match', /\/cart$/);
    cy.go('back')

    cy.get('main')
        .find('div.products-list')
        .get('a.product').as('productCard')

    cy.get('@productCard')
        .eq(0).click()
    cy.location('pathname').should('match', /\/product\/1$/);
    cy.go('back')

    cy.get('@productCard')
        .eq(0)
        .find('img').should('have.attr','alt')
    cy.get('@productCard')
        .eq(0)
        .contains('h2','Brand:')
        .next('p').contains('Description:')
        .next('p').contains('Price:')

    cy.get('@productCard')
        .eq(3).click()
    cy.location('pathname').should('match', /\/product\/4$/);
    cy.go('back')

    cy.get('@productCard')
        .eq(3)
        .find('img').should('have.attr','alt')
    cy.get('@productCard')
        .eq(3)
        .contains('h2','Brand:')
        .next('p').contains('Description:')
        .next('p').contains('Price:')

    cy.get('@productCard')
        .eq(8).click()
    cy.location('pathname').should('match', /\/product\/9$/);
    cy.go('back')

    cy.get('@productCard')
        .eq(8)
        .find('img').should('have.attr','alt')
    cy.get('@productCard')
        .eq(8)
        .contains('h2','Brand:')
        .next('p').contains('Description:')
        .next('p').contains('Price:')
  })
})
