const resHandler = require('../resHandler');

const wrapper = async (fn, res) => {
  try {
    let result = await fn();
    resHandler.sendSuccess(res, result)
  } catch (error) {
    resHandler.sendError(res, error);
  }
}

module.exports = wrapper;