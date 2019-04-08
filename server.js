const express = require('express');
const app = express();

app.use(require('connect-history-api-fallback')())
app.use(express.static('./dist'));

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`server running @${port}`);
})
