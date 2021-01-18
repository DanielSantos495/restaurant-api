const error404 = (req, res) => {
   res.status(404).json({
      error: 'Route not found'
   })
}

module.exports = error404;