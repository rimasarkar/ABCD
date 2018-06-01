'use strict'
var ProcessMileStoneDao = require("../dao/processMileStoneDao");
var log = require('../logger');
module.exports.Controller = function (app, db, passport) {

    var processMileStoneDao = new ProcessMileStoneDao(db['process_milestones'], db['milestone_setup']);

    app.put('/common/put/processmilestone', passport.ensureAuthenticated, function (req, res) {
        processMileStoneDao.updateMileStones(req, function (result) {
            res.json(result);
        });
    });

    app.get('/common/retrieveprocessmilestones/productinstanceid/:id', passport.ensureAuthenticated, function (req, res) {
        try {
            processMileStoneDao.getRetrieveProcessMilestones(req, db['product_instance'], function (result) {
                res.json(result);
            })
        }
        catch (err) {
            log.error("Exception caught ", err.message, "processMileStoneController");
            res.status(500).json({ "isSuccessful": "false", "error": err.message });
        }
    })

}
