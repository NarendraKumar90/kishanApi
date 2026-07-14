require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();


//const bodyParser = require("body-parser");


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//const app = express();

app.use(cors());
app.use(bodyParser.json());

// 2. Serve Swagger UI at /api-docs route seamlessly

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Middleware for additional headers if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});




//============== Get Kishan Api ===========


// Root welcome route
app.get('/', (req, res) => {
  res.send('<h1>Welcome Back Naren!</h1>');
});


app.get('/items', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM items ORDER BY itemid'
    );

    res.status(200).json({
      status: 200,
      items: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//Kishan

app.get('/kishan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM kishan ORDER BY kid DESC'
    );

    res.status(200).json({
      status: 200,
      kishan: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Tran

app.get('/tran', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tran ORDER BY tid DESC'
    );

    res.status(200).json({
      status: 200,
      tran: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Sum Apis

app.get('/ttlpaid', async (req, res) => {
  try {
   // const { kid } = req.params;

    const result = await pool.query(
      'SELECT COALESCE(SUM(paidamt),0) AS paidamt FROM tran ',
      [kid]
    );

    res.status(200).json({
      status: 200,
      paidamt: result.rows[0].paidamt
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.get('/paidamount/:kid', async (req, res) => {
  try {
    const { kid } = req.params;

    const result = await pool.query(
      'SELECT COALESCE(SUM(paidamt),0) AS paidamt FROM tran WHERE kid=$1',
      [kid]
    );

    res.status(200).json({
      status: 200,
      paidamt: result.rows[0].paidamt
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//===

app.get('/totalsales', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COALESCE(SUM(total),0) AS total FROM tran'
    );

    res.status(200).json({
      status: 200,
      total: result.rows[0].total
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//====

app.get('/totaldue', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COALESCE(SUM(dueamt),0) AS dueamt FROM tran'
    );

    res.status(200).json({
      status: 200,
      dueamt: result.rows[0].dueamt
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//====

app.get('/kishancount', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) AS total FROM kishan'
    );

    res.status(200).json({
      status: 200,
      total: result.rows[0].total
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//==========port=======

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
