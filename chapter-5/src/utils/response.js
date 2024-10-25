exports.successResponse = (res, data, message = "Operation success") => {
  res.status(200).json({ success: true, message, data });
};
