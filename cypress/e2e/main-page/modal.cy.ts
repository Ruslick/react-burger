describe("main page", () => {
	before(() => {
		cy.visit("/");
	});
	it("modal test", () => {
		cy.wait(1000);

		cy.get("p").contains("Краторная булка N-200i").click();
		cy.get("#ModalOverlay").should("exist");
		cy.get("p").contains("Детали ингредиента").should("exist");
		cy.get("body").type("{esc}");

		cy.get("#ModalOverlay").should("not.exist");
	});
});
