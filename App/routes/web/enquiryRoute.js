const express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require('../../controllers/web/enquiryController');

const enquiryRoute = express.Router();

enquiryRoute.post('/enquiry-insert', enquiryInsert);
enquiryRoute.get('/enquiry-view', enquiryList);
enquiryRoute.delete('/enquiry-delete/:id', enquiryDelete);
enquiryRoute.put('/enquiry-update/:id', enquiryUpdate);

module.exports = { enquiryRoute };
