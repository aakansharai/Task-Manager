const express = require('express');

const logger = (req, res, next) => {
    var method = req.method;
    var url = req.url;
    var data = req.body;

    console.log("Method : ", method, "\n url : ", url, "\n Data : ", data);

    next();
}

module.exports = logger;
