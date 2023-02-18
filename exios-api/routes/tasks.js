const express = require('express');

const tasks = require('../controllers/tasks');
const { protect, isAdmin, isEmployee } = require('../middleware/check-auth');
const multer = require('multer');
const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
            fileSize: 10 * 1024 * 1024, // No larger than 5mb, change as you need
      },
});
const router  = express.Router();

router.route('/mytasks')
      .get(protect, isAdmin, isEmployee, tasks.getMyTasks)

router.route('/task/:id')
      .get(protect, isAdmin, isEmployee, tasks.getTask)
      .put(protect, isAdmin, isEmployee, tasks.updateTask)

router.route('/task/:id/status')
      .put(protect, isAdmin, isEmployee, tasks.changeTaskStatus)

router.route('/create/task')
      .post(protect, isAdmin, isEmployee, upload.array('files'), tasks.createTask)

router.route('/task/uploadFiles')
      .post(protect, isAdmin, isEmployee, upload.array('files'), tasks.uploadFiles)
      .delete(protect, isAdmin, isEmployee, tasks.deleteFile)

router.route('/task/:id/comments')
      .get(protect, isAdmin, isEmployee, tasks.getComments)
      .post(protect, isAdmin, isEmployee, tasks.createComment)

module.exports = router;
