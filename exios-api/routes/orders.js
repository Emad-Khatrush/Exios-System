const express = require('express');

const orders = require('../controllers/orders');
const { protect, isAdmin, isClient, isEmployee } = require('../middleware/check-auth');
const multer = require('multer');
// cloudinary settings
const { storage } = require('../utils/cloudinary');
const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
            fileSize: 10 * 1024 * 1024, // No larger than 5mb, change as you need
      },
});

const router  = express.Router();

// Admin Routes
router.route('/invoices')
      .get(protect, isAdmin, orders.getInvoices);

router.route('/orders')
      .get(protect, isAdmin, isEmployee, orders.getOrders)
      .post(protect, isAdmin, isEmployee, upload.array('files'), orders.createOrder);

router.route('/packages/orders')
      .get(protect, isAdmin, orders.getPackagesOfOrders)

router.route('/currentOrdersTab')
      .get(protect, isAdmin, isEmployee, orders.getOrdersTab)

router.route('/orders/:searchValue/:searchType')
      .get(protect, isAdmin, isEmployee, orders.getOrdersBySearch)

router.route('/unsureOrder/add')
      .post(protect, isAdmin, isEmployee, orders.createUnsureOrder);

router.route('/order/uploadFiles')
      .post(protect, isAdmin, isEmployee, upload.array('files'), orders.uploadFiles);
      
router.route('/order/deleteFiles')
      .delete(protect, isAdmin, isEmployee, orders.deleteFiles);

router.route('/order/:id')
      .get(protect, isAdmin, isEmployee, orders.getOrder)
      .put(protect, orders.updateOrder);

router.route('/order/:id/cancel')
      .post(protect, isAdmin, isEmployee, orders.cancelOrder);

router.route('/order/:id/addActivity')
      .post(protect, isAdmin, isEmployee, orders.createOrderActivity)

// Client Routes

router.route('/client/home')
      .get(protect, isClient, orders.getClientHomeData)

router.route('/client/orders/:type')
      .get(protect, isClient, orders.getOrdersForUser)

router.route('/client/orders/search/:value')
      .get(protect, isClient, orders.getOrdersClientBySearch)

router.route('/client/order/:id')
      .get(protect, isClient, orders.getClientOrder)

router.route('/client/create/trackingNumber')
      .post(protect, isClient, orders.createTrackingNumbersForClient)

router.route('/client/unsureOrder/:id/delete')
      .delete(protect, isClient, orders.deleteUnsureOrder)

module.exports = router;
