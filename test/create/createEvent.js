/**
 * augur.js tests
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

var assert = require("chai").assert;
var _ = require("lodash");
var abi = require("augur-abi");
var tools = require("../tools");
var runner = require("../runner");
require('it-each')({ testPerIteration: true });

describe("Unit tests", function () {
    runner("eth_sendTransaction", [{
        method: "createEvent",
        parameters: ["hash", "string", "int", "fixed", "fixed", "int", "string"]
    }]);
});

describe("Integration tests", function () {

    if (process.env.AUGURJS_INTEGRATION_TESTS) {

        var minValue = 1;
        var maxValue = 2;
        var numOutcomes = 2;
        var numEvents = 2;
        var augur = tools.setup(require("../../src"), process.argv.slice(2));
        var branch = augur.branches.dev;
        var period = augur.getVotePeriod(branch);
        var expDate = new Date().getTime()*2;
        var resolution = "https://www.google.com";

        describe("Creating " + numEvents + " events", function () {
            var events = [];
            it.each(_.range(0, numEvents), "create event %s", ['element'], function (element, next) {
                this.timeout(tools.TIMEOUT);
                var description = "€" + Math.random().toString(36).substring(4);
                console.log("description:", description);
                augur.createEvent({
                    branchId: branch,
                    description: description,
                    expDate: expDate,
                    minValue: minValue,
                    maxValue: maxValue,
                    numOutcomes: numOutcomes,
                    resolution: resolution,
                    onSent: function (r) {
                        console.log("sent:", r);
                        assert(r.txHash);
                        assert(r.callReturn);
                    },
                    onSuccess: function (r) {
                        console.log("success:", r);
                        var eventID = r.callReturn;
                        assert.strictEqual(augur.getCreator(eventID), augur.coinbase);
                        assert.strictEqual(augur.getDescription(eventID), description);
                        next();
                    },
                    onFailed: function (r) {
                        next(new Error(tools.pp(r)));
                    }
                });
            });
        });
    }

});
