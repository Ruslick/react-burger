// in work
describe("switch test", () => {
	before(() => {
		cy.visit("/");
	});
	it("remove ingridient", () => {
		cy.wait(1000);
		cy.viewport("macbook-16");

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

		cy.get("p")
			.contains("Соус традиционный галактический")
			.trigger("dragstart")
			.trigger("dragleave");

		const elem1 = cy.get("span").contains("Соус Spicy-X");

		elem1.trigger("dragenter").trigger("dragover").trigger("drop");
		elem1.trigger("dragstart").trigger("dragleave");

		const elem2 = cy.get("span").contains("Соус традиционный галактический");

		elem2.trigger("dragenter").trigger("dragover").trigger("drop", "bottom");
	});
});
