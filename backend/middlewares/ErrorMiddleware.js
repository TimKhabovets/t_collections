import ApiError from '../exceptions/ApiError.js';

export default function(err, req, res, next) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({massage: err.message, errors: err.errors});
  }
  return res.status(500).json({massage: 'Unexpected error'});
}