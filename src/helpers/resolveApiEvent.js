

class ApiEventController {

  checkEventMethod = (req, res, method) => {

    if (req.method !== method) {
      res.status(405).json({ error: 'Method not allowed' });

    }
  }
}

module.exports = new ApiEventController();
