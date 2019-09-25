process.env.ENV = "test";

const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { connectDatabase } = require("../src/server");

chai.use(chaiHttp);

setTimeout(() => {
  before(async function() {
    this.conn = await connectDatabase("api");
  });

  after(async function() {
    await this.conn.connection.dropDatabase();
    await this.conn.connection.close();
  });
});