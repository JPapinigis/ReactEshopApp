
function chooseProduct(itemIndex) {

  cy.get('main')
    .find('div.products-list')
    .get('a.product').eq(Math.floor(Math.random() * 30)).as('product-' + itemIndex)
    .find('h2')
    .then(($h2) => {
      const brand = ($h2.text())
      cy.wrap(brand).as('brand')
    })

  cy.get('@product-' + itemIndex)
    .find('p').eq(1)
    .then(($p) => {
      const price = ($p.text())
      cy.wrap(price).as('price')
      const pattern = /[0-9]+/g
      const number = price.match(pattern)
      cy.wrap(number).as('itemPrice-' + itemIndex)
    })
}
function checkCartItemDetails(itemIndex) {

  cy.get('main')
    .get('[data-cy="cart-items"]')
    .get('div.item-details').eq(itemIndex).as('cart-item')

  cy.get('@cart-item')
    .find('img')
    .should('have.attr','alt')

  cy.get('@brand').then(brand => {
    cy.get('@cart-item')
      .find('[data-cy="brand"]')
      .should('have.text', brand)
  })

  cy.get('@cart-item')
    .find('[data-cy="category"]')
    .should('include.text', 'Category:')

  cy.get('@price').then(price => {
    cy.get('@cart-item')
      .find('[data-cy="price"]')
      .should('have.text', price)
  })
  cy.get('@cart-item')
    .find('button')
    .should('have.text','Remove')

}
function checkTotalPrice() {
  cy.get('@currentTotal').then(number => {
    if (number > 1000) {
      cy.get('[data-cy="total-price"]')
        .should('have.text', 'Discounted total: ' + (number * 0.9).toFixed(2) + '€')
    } else {
      cy.get('[data-cy="total-price"]')
        .should('have.text', 'Total: ' + number + '€')
    }
  })
}
function removeFromCart(itemIndex) {
let initialItemCount
  cy.get('[data-cy="cart-items"]')
      .find('div.item-details')
      .its('length')
      .then((count) => {
        initialItemCount = count;
        cy.get('[data-cy="cart-items"]')
            .find('div.item-details').eq(itemIndex)
            .find('button').click();
        cy.get('[data-cy="cart-items"]')
            .find('div.item-details')
            .should('have.length', initialItemCount - 1);
      })
}

describe ('HomepageTests', () => {

  it('homepage elements', () => {
    let currentTotal = 0

    cy.visit('/')

    chooseProduct(1)

    cy.get('@product-1')
      .click()

    cy.get('main')
      .find('[data-cy="productDetails-card"]')
      .contains('Add to cart').click()

    cy.location('pathname').should('match', /\/cart$/);

    cy.get('header')
      .find('div')
      .children()
      .should('have.length', 1)

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 1')

    cy.get('main')
      .find('[data-cy="cart-items"]')
      .children()
      .should('have.length', 3)

    cy.get('main')
      .contains('Back to catalog')
      .should('have.attr', 'href')

    checkCartItemDetails(0)

    cy.get('@itemPrice-1').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

    cy.get('main')
      .contains('Back to catalog')
      .click()

    chooseProduct(2)

    cy.get('@product-2')
      .click()

    cy.get('main')
      .find('[data-cy="productDetails-card"]')
      .contains('Add to cart').click()

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 2')

    checkCartItemDetails(1)

    cy.get('@itemPrice-2').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

      cy.get('main')
        .contains('Back to catalog')
        .click()

    chooseProduct(3)

    cy.get('@product-3')
      .click()

    cy.get('main')
      .find('[data-cy="productDetails-card"]')
      .contains('Add to cart').click()

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 3')

    checkCartItemDetails(2)

    cy.get('@itemPrice-3').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

    removeFromCart(1)

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 2')

    removeFromCart(0)

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 1')

    removeFromCart(0)

    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 0')

    cy.get('main')
      .find('[data-cy="cart-items"]')
      .children()
      .should('have.length', 2)

    cy.get('main')
      .contains('h1','Your cart is empty')

    cy.get('main')
      .contains('a','Back to catalog').click()

    cy.location('pathname').should('match', /\/$/);
    cy.get('header')
      .find('p')
      .should('have.text', 'Items in Cart: 0')
  })
})
