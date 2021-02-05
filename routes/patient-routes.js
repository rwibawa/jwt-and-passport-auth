const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get(
  '/',
  (req, res, next) => {
    axios.get('http://localhost:8080/api/patient', {
      params: {
        employeeId: req.query.employeeId,
        clientId: req.query.clientId
      }
    })
    .then(response => {
      res.json(response.data.data);
      next();
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
  }
);

module.exports = router;
