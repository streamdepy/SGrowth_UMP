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

router.get("/gri-1", function (req, res, next) {
  res.render("mitra/gri-economic/gri-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gri-2", function (req, res, next) {
  res.render("mitra/gri-economic/gri-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-1", function (req, res, next) {
  res.render("mitra/gri-env/env-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

// router.post("/env-1", middlewareValidation, environmentController.saveEnvironmentBasicInfo);
// router.post("/env-2", middlewareValidation, environmentController.saveEnvScope1);

router.get("/env-2", function (req, res, next) {
  res.render("mitra/gri-env/env-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-3", function (req, res, next) {
  res.render("mitra/gri-env/env-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-4", function (req, res, next) {
  res.render("mitra/gri-env/env-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-5", function (req, res, next) {
  res.render("mitra/gri-env/env-5", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-6", function (req, res, next) {
  res.render("mitra/gri-env/env-6", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-7", function (req, res, next) {
  res.render("mitra/gri-env/env-7", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-1", function (req, res, next) {
  res.render("mitra/gri-gov/gov-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-2", function (req, res, next) {
  res.render("mitra/gri-gov/gov-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-3", function (req, res, next) {
  res.render("mitra/gri-gov/gov-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-1", function (req, res, next) {
  res.render("mitra/gri-material/material-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-2", function (req, res, next) {
  res.render("mitra/gri-material/material-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-3", function (req, res, next) {
  res.render("mitra/gri-material/material-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-4", function (req, res, next) {
  res.render("mitra/gri-material/material-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-1", function (req, res, next) {
  res.render("mitra/gri-social/social-1", {
    title: "GRI Social - K3",
    layout: "mitra", 
    currentPath: req.path,
    gri_id: req.query.gri_id || null,
    reporting_period: req.query.period || null,
  });
});

router.get("/social-2", function (req, res, next) {
  res.render("mitra/gri-social/social-2", {
    title: "GRI Social - Penyakit Akibat Kerja",
    layout: "mitra",
    currentPath: req.path,
    social_id: req.query.social_id || null,
    reporting_period: req.query.period || null,
  });
});

router.get("/social-3", function (req, res, next) {
  res.render("mitra/gri-social/social-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-4", function (req, res, next) {
  res.render("mitra/gri-social/social-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-5", function (req, res, next) {
  res.render("mitra/gri-social/social-5", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});


module.exports = router;
