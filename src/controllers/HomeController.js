class HomeController {
  index(req, res) {
    res.json({
      "check": true
    });
  }
}

export default new HomeController();
