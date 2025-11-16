const express = require("express");
const router = express.Router();

router.get("/form-gri", function (req, res, next) {
  res.render("umkm/form-gri", {
    title: "Form GRI",
    layout: "umkm",
  });
});

router.get("/form-gri_nc", function (req, res, next) {
  res.render("umkm/form-gri_nc", {
    title: "Form GRI",
    layout: "umkm",
  });
});

router.get("/gri-1", function (req, res, next) {
  res.render("umkm/gri-economic/gri-1", {
    title: "Form GRI",
    layout: "umkm",
  });
});

module.exports = router;
