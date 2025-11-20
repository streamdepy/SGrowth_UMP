const express = require("express");
const router = express.Router();

router.get("/dashboard", function (req, res, next) {
  res.render("mitra/dashboard", {
    title: "Dashboard mitra",
    layout: "mitra",
  });
});

router.get("/form-gi", function (req, res, next) {
  res.render("mitra/form-gi", {
    title: "Form GI",
    layout: "mitra",
  });
});

router.get("/form-gri", function (req, res, next) {
  res.render("mitra/form-gri", {
    title: "Form GRI",
    layout: "mitra",
  });
});

router.get("/form-gi", function (req, res, next) {
  res.render("mitra/form-gi", {
    title: "Form GI",
    layout: "mitra",
  });
});


module.exports = router;
