const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get(
  '/',
  (req, res, next) => {
    axios.get('http://localhost:8080/api/patient?employeeId=297-02-1974&clientId=41221')
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
