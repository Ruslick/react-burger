describe("main page", () => {
	before(() => {
		cy.visit("/");
	});
	it("remove ingridient", () => {
		cy.wait(1000);

		cy.get("p")
			.contains("Краторная булка N-200i")
			.trigger("dragstart")
			.trigger("dragleave");
		cy.get("p")
			.contains("Выберите булку...")
			.trigger("dragenter")
			.trigger("dragover")
			.trigger("drop");

		cy.get("p")
			.contains("Соус Spicy-X")
			.trigger("dragstart")
			.trigger("dragleave");
		cy.get("p")
			.contains("Выберите ингридиент...")
			.trigger("dragenter")
			.trigger("dragover")
			.trigger("drop");
		cy.get("span").contains("Соус Spicy-X").should("exist");
		cy.get("span").contains("Соус Spicy-X").parent().find("svg").last().click();
		cy.get("p").contains("Выберите ингридиент...").should("exist");
	});
});
