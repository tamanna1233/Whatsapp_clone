import { dbconnect } from '../src/db/index.js';
import server from './app.js';
dbconnect()
    .then(() => {
        const port = process.env.PORT || 5000;
        server.listen(port, () => {
            console.log(`app listen on ${port}`);
        });
    })
    .catch((err) => {
        console.log('something went wrong ', err);
        process.exit(1);
    });
 