// Load enviroment variables
require('dotenv').config();

// Require framework
const Framework = require('./core/Framework');
const fw = new Framework();

// Create HTTP Server
fw.getHTTPSServer();

// Get app
const app = fw.getKoa();

// Load middleware (inc. Apollo server)
const middleware = fw.requireMiddleware();
for (let name in middleware) middleware[name](app);

// Add module routes
const RouterAuthorization = process.env.FSTACK_AUTHORIZATION_ROUTER ?
  use(process.env.FSTACK_AUTHORIZATION_ROUTER)
  : false;
const router = fw.getHTTPRouter();
fw.addRoutes(app, router, RouterAuthorization);

// Display current resources
const activeResources = fw.getModuleManager().getResourcesNames();
activeResources.forEach(r => console.log(r));

// Start app
const port = process.env.FSTACK_HTTP_PORT || 4000;
app.listen({ port }, () =>
  console.log('Server ready at http://localhost:' + port),
);
