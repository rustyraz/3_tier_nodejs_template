module.exports = {
  index: (req, res) => {
    res.status(200).json({
      version: '1.0',
      name: 'Investment App'
    })
  }
}
