

// GET /home
export function home(req, res, next) {
    //res.send('<h2>Hola soy el middleware home</h2>');
    res.locals.param = "Parametro chulo";

    res.render('home');
};