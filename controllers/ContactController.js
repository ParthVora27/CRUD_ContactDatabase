//crud operation file
const express = require("express");
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");
var router = express.Router();

//get:read
router.get("/", (req, res) => {
    res.render("contact/AddOrEdit", {
        viewtitle: "INSERT DATA"
    });
});

//put:create
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.phone = req.body.phone;
    contact.email = req.body.email;
    contact.save((err, doc) => {
        if (!err)
            res.redirect("user/list");
        else {
            console.log("error database:" + err)
        }
    });
};


router.get("/list", (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.render("contact/Data", {
                Data: docs
            });
        }
        else {
            console.log("error in list: " + err);
        }
    })
    .lean()
});

router.get('/:id', (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/AddOrEdit", {
                viewtitle: "UPDATE DATA ",
                user: doc
            });
        }
    })
    .lean()
});

function updateRecord(req, res) {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('user/list'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });
};

router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else { console.log('Error in delete :' + err); }
    })
    .lean()
});


module.exports = router;