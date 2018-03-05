const ResponseService = (res, err, data, status = null, message = null) => {
  if (err) {
    return res.status(err.status || 400).json(err);
  }
  status = status || 201;
  return res.status(status).json(data);
};

module.exports = ResponseService;
