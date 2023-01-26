const ROOT = Cypress.env('ROOT')
const NAME_ROOT = Cypress.env('NAME_ROOT')

describe('PermanentRegistrar', () => {
  it('can visit a name and register it', () => {
    cy.visit(`${ROOT}/name/vitalik.redlc`)
    cy.getByTestId('request-register-button').click({ force: true })
    cy.getByTestId('register-button').click({
      force: true
    })
    cy.getByTestId('manage-name-button').click({ force: true })

    cy.getByTestId('details-value-registrant', { exact: false }).should(
      'have.text',
      Cypress.env('ownerAddress')
    )
    cy.getByTestId('details-value-controller', { exact: false }).should(
      'have.text',
      Cypress.env('ownerAddress')
    )
  })
  it('shows premium', () => {
    cy.visit(`${ROOT}/name/rel.redlc`)
    cy.queryByText('This name has a temporary premium', {
      exact: false
    }).should('exist')
    cy.queryByText('Price per amount of time selected', {
      exact: false
    }).should('exist')
  })
  it('does not show released owner info', () => {
    cy.visit(`${ROOT}/name/rel.redlc/details`)
    cy.getByTestId('details-value-registrant', {
      exact: false
    }).should('have.text', 'No address found')
    cy.getByTestId('details-value-controller', {
      exact: false
    }).should('have.text', 'No address found')
  })
  it('cannot register a name that is already owned', () => {
    cy.visit(`${ROOT}/name/resolver.redlc`)
    cy.getByTestId('details-value-registrant', {
      exact: false
    }).should('have.text', Cypress.env('ownerAddress'))
    cy.getByTestId('details-value-controller', { exact: false }).should(
      'have.text',
      Cypress.env('ownerAddress')
    )
  })

  it('can visit a name and cannot register before the wait time is over', () => {
    cy.visit(`${ROOT}/name/vitalik2.redlc`)
    cy.getByTestId('request-register-button').click({ force: true })
    cy.queryByText('register-button', { timeout: 1000 }).should('not.exist')
  })

  it('cannot register too short name', () => {
    cy.visit(`${ROOT}/name/ab.redlc`)
    cy.queryByText('Name is too short', {
      exact: false
    }).should('exist')
    // No need to wait 10 sec as the previous assertion should wait enough
    cy.queryByText('request-register-button', { timeout: 1000 }).should(
      'not.exist'
    )
  })

  it('cannot register malformated name', () => {
    cy.visit(`${ROOT}/name/ab redlc`)
    cy.queryByText('Domain malformed. ab redlc is not a valid domain', {
      exact: false
    }).should('exist')
    // No need to wait 10 sec as the previous assertion should wait enough
    cy.queryByText('request-register-button', { timeout: 1000 }).should(
      'not.exist'
    )
  })
})
