import User from "../models/User.js";


// GET /login
export async function login(req, res, next) {
    res.locals.error = ''
    res.locals.email = ''

    res.render('login');
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    //const { username, password } = req.body;

    // buscar el usuario en la base de datos
    const user = await User.findOne({ email: email.toLowerCase() });
    //const user = await User.findOne({ username: username.toLowerCase() });

    // si no lo encuentro, o la contraseña no coincide --> error
    if (!user || !(await user.comparePassword(password))) {
      res.locals.error = 'El correo electrónico o la contraseña son incorrectos.';
      res.locals.email = email;
      res.render('login');
      return
    }

    // si el usuario existe y la contraseña coincide --> apuntar en su sesión, que está logado
    req.session.userId = user._id;
    req.session.userName = user.email;

    // redirect a la home
    res.redirect('/');
  } catch (error) {
    next(error);
  }

}


export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err)
    res.redirect('/')
  })
}