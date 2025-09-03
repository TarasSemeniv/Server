const requireRole = (role) => {
    return (req, res, next) => {
    try {
      if (req.user.role !== role) {
        return res.status(403).send("Access denied");
      }
      next();
    } catch (err) {
      return res.status(403).send("Access denied");
    }
  };
};

export default requireRole;