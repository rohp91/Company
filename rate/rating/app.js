var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./db/conn");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Comapny = require('./routes/models/schema');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//For Getdata
app.get("/company", async (req, res) => {
  console.log("aaaaaa")
  try {
    const data1 = await Comapny.find({});

    res.status(201).send(data1);
  } catch (err) {
    res.status(400).send(err)

  }
})
//For save
app.post("/company", async (req, res) => {

  try {
    const addCompany = new Comapny(req.body)

    console.log(req.body)
    const data = await addCompany.save();
    res.status(201).send(data);
  } catch (err) {
    res.send(err)

  }
})

//For Edit
app.put("/edit/:id", async (req, res) => {
  const id = (req.params.id) ? req.params.id : null;
  Comapny.find({ _id: id }, function (err, isData) {
    if (err) return res.status(401).send(err);
    if (isData.length > 0) {
      const sheduleData = {
        companyname: req.body.companyname,
        Rating: req.body.Rating,
        Review: req.body.Review
      }
      console.log(req.body.companyname);
      Comapny.update({ _id: id }, sheduleData, {}, (err, data) => {
        if (err) return res.status(401).send({ err: err, message: "something went wrong !!!" });
        return res.status(200).send({ data: data, message: "Updated !!!" });
      });

    } else {
      res.status(401).send('no records found for update');
    }


  });
  //res.send('respond with a resource');
});
app.patch("/companyupdatebyID/:id", async (req, res) => {
  const id = (req.params.id) ? req.params.id : null;
  Comapny.find({ _id: id }, function (err, isData) {
    if (err) return res.status(401).send(err);
    let sheduleData = {};
    if (isData.length > 0) {
      console.log(req.body,"abc")
      for (i = 0; i < req.body.length; i++) {
        sheduleData[req.body[i].colunm] = req.body[i].hhh;
      }
      
     
      console.log("sheduleData :: ", sheduleData);
      Comapny.update({ _id: id }, sheduleData, {}, (err, data) => {
        if (err) return res.status(401).send({ err: err, message: "something went wrong !!!" });
        return res.status(200).send({ data: data, message: "Updated !!!" });
      });

    }

  })
});

//FOr Delete
app.get("/delete/:id?", async (req, res) => {
  console.log(req.params.id);
  Comapny.findOneAndDelete(req.params.id, (err, data) => {
    console.log(data)
    if (err) {
      return res.redirect('/company')
    }
    return res.redirect('/company')
  })

})


//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
