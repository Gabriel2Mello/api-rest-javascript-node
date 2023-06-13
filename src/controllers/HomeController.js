class HomeController {
  async index(req, res) {
    res.json({
      check: true,
    });
  }
}

export default new HomeController();
