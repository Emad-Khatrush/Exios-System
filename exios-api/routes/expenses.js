const express = require('express');
const expenses = require('../controllers/expenses');
const { protect, isAdmin, isEmployee } = require('../middleware/check-auth');
const multer = require('multer');

// cloudinary settings
// const { storage } = require('../utils/cloudinary');
const upload = multer();

const router  = express.Router();

router.route('/expenses')
      .get(protect, isAdmin, isEmployee, expenses.getExpenses)
      .post(protect, isAdmin, isEmployee, upload.array('files'), expenses.createExpense);

      
router.route('/expense/uploadFiles')
      .post(protect, isAdmin, isEmployee, upload.array('files'), expenses.uploadFiles);
      
router.route('/expense/deleteFiles')
      .delete(protect, isAdmin, isEmployee, expenses.deleteFiles);

router.route('/expense/:id')
      .get(protect, isAdmin, isEmployee, expenses.getExpense)
      .put(protect, isAdmin, isEmployee, expenses.updateExpense);

module.exports = router;
