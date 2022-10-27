describe("main page", () => {
	it("should be available on localhost:3000", () => {
		cy.visit("/");
	});

	it("dnd test", async () => {
		cy.clearCookie("token");
		cy.clearCookie("refreshToken");
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

		cy.get("button").contains("Оформить заказ").click();

		cy.intercept("https://norma.nomoreparties.space/api/auth/user").as("auth");
		cy.wait("@auth");

		cy.get("input[type=email]").type("motsukov@gmail.com");
		cy.get("input[type=password]").type("123123123{enter}");

		cy.wait(1000);

		cy.get("button").contains("Оформить заказ").click();
		cy.intercept("https://norma.nomoreparties.space/api/orders").as("order");
		cy.wait("@order");

		cy.get(".text.mt-15").should("exist");
		cy.get("body").type("{esc}");
		cy.get(".text.mt-15").should("not.exist");
	});
});
