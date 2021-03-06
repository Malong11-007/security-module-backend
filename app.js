var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./config/db")
const cors = require('cors')

var indexRouter = require('./routes/index');

var applicationRouter = require('./routes/security/applicationRoute');
var rolesRouter = require('./routes/security/rolesRoute');
var rolesFormsRouter = require('./routes/security/rolesFormsRoute');
var rolesModulesRouter = require('./routes/security/rolesModulesRoute');
var usersRouter = require('./routes/security/usersRoute');
var userRolesRouter = require('./routes/security/userRolesRoute');
var loginRouter =  require('./routes/loginRoute.js');
var itemRouter = require('./routes/purchaseOrder/itemRoute');
var purchaseOrderRouter = require('./routes/purchaseOrder/purchaseOrderRoute');
var departmentRouter = require('./routes/purchaseOrder/departmentRoute');
var supplierRouter = require('./routes/purchaseOrder/supplierRoute');



// Database Connection Check
db.connect(err => {
  if (err) {
    console.log("Error connecting to Db -- ",err);
    return;
  }
  console.log("Database - Connection established");
});

var app = express();
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.use('/api/application', applicationRouter);

app.use('/api/roles-modules', rolesModulesRouter);
app.use('/api/roles-forms', rolesFormsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/user-roles', userRolesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/items', itemRouter);
app.use('/api/purchase-order', purchaseOrderRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/department',departmentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
