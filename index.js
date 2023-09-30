const express = require('express');

const app = express ();
app.use(express.json());

app.get("/status", (request, response) => {
  const status = {
    "Status": "Running",
  };

  response.send(status);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

