import jwt from 'jsonwebtoken';

export const generateToken = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None', 
  maxAge: 24 * 60 * 60 * 1000
});


  res.redirect(process.env.CLIENT_URL + '/dashboard');
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out" });
};
 
