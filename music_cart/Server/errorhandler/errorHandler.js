const errorHandler = (req, res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  };
  
  module.exports = errorHandler;