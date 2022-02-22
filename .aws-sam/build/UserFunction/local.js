const local = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3002;
local.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});

