const products = require('../components/products/route');
const auth = require('../components/auth/route');
const users = require('../components/users/route');
const error404 = require('../components/error404');

const routes = server => {
   server.use('/api/products', products)
   server.use('/api/users', users)
   server.use('/api/auth', auth)
   server.use(error404)
}

module.exports = routes;