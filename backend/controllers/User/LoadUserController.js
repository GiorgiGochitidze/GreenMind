
export const LoadUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  res.status(200).json({ user: req.user });
};
