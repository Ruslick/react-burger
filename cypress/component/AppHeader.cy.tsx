import AppHeader from "../../src/components/AppHeader/AppHeader"
import {App} from "../../src/components/App/App"
import {CustomDate} from "../../src/components/CustomDate/CustomDate"
import React from "react"




describe('AppHeader.cy.ts', () => {
  it('header', () => {
    cy.mount(
      <CustomDate dateString="2022-10-26T11:43:10.046Z" />
    )
  })
})