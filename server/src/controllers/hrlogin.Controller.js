const user = {
  username: "Mandeep",
  password: "vrlive0",
};

const HrControllerlogin = (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = HrControllerlogin;
