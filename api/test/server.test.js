const chai = require("chai");
const { expect } = chai;

const { app } = require("../src/server");




describe("user.routes.js", function () {
    it("should show users", async () => {
        const response = await chai
            .request(app)
            .post("/users")
            .send({
                firstName: "carl",
                lastName: "carlson",
            });


        expect(response.status).to.equal(201);
        expect(response.body.firstName).to.equal("carl");
    })
});