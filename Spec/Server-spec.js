'use strict'
const request = require("request")
const base_url = "http://localhost:8080/"
describe("Server Testing", function () {
    describe("GET /search", function () {
        it("returns status code 200", function (done) {
            request.get(base_url + 'search?=Saw"', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done()
            })
        })
    })
    describe("GET /madeup", function () {
        it("returns status code 404 not found", function (done) {
            request.get(base_url + 'madeup', function (error, response, body) {
                expect(response.statusCode).toBe(404);
                done()
            })
        })
    })
})