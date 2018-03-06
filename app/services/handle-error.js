const _ = require('lodash');

const HandleErrorService = (error, detail = null, status = null) => {
  let objectError = {
    "type": "UnexpectedError.",
    "title": "Unexpected Error.",
    "status": 400,
    "detail": "Unexpected Error.",
    "details": [
    ],
    "instance": "Unexpected Error."
  };

  if (error && error.name === 'ValidationError') {
    objectError.type = "ValidationError";
    objectError.title = "Validation Error";
    objectError.name = error._message;
    objectError.status = 400;
    _.each(error.errors, (error)=>{
      objectError.details.push(error.message);
    });
    objectError.detail = objectError.details[0];
    objectError.instance = "ValidationError: " + _.values(error)[1];
  } else if(error && error.name === 'MongoError' && error.code===11000 ) {
    objectError.type = "MongoError";
    objectError.title = "Mongo Error";
    objectError.name = error._message;
    objectError.status = 409;
    objectError.details.push('The username is already taken by another user.');
    objectError.detail = objectError.details[0];
    objectError.instance = "MongoError: " + _.values(error)[1];
  } else {
    objectError.details.push(detail || error);
    objectError.status = status || objectError.status;
    objectError.detail = detail || 'Unexpected Error.';
  }

  return objectError;
};

module.exports = HandleErrorService;
