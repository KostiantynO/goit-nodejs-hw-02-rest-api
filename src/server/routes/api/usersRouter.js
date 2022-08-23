const { Router } = require('express');
const model = require('../../models');
const {
  validation,
  wrapper,
  auth,
  upload,
  formatImage,
} = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const validateRegister = validation(model.addUserJoiSchema);
const validateLogin = validation(model.loginJoiSchema);
const validateSubscription = validation(model.subscriptionJoiSchema);

const router = Router();

router
  .post('/register', validateRegister, wrapper(ctrl.register))
  .post('/login', validateLogin, wrapper(ctrl.login))
  .get('/current', auth, wrapper(ctrl.getCurrent))
  .patch('/', auth, validateSubscription, wrapper(ctrl.updateSubscription))
  .patch(
    '/avatars',
    auth,
    upload.single('avatar'),
    formatImage,
    wrapper(ctrl.updateAvatar),
  )
  .post('/logout', auth, wrapper(ctrl.logout));

module.exports = router;
