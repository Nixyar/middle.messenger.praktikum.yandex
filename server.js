const express = require('express');

const app = express();

app.use(express.static('./'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening port ${process.env.PORT}`);
});
