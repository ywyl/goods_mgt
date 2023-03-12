const { PORT } = require('./config/config'); 

const app = require('./app/index');

app.listen(PORT, () => {});