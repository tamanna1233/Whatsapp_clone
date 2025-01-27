import { dbconnect } from '../src/db/index.js';
import server from './app.js';

/* This code snippet is establishing a connection to a database using the `dbconnect` function, which
returns a promise. If the connection is successful, it then sets up a server to listen on a
specified port (either from the environment variable `PORT` or defaulting to 5000). Once the server
is listening, it logs a message indicating the server is running. */
dbconnect()
    .then(() => {
        const port = process.env.PORT || 5000;
        server.listen(port, () => {
            console.log(`sever listening on ${port}`);
        });
    })
    .catch((err) => {
        console.log('something went wrong ', err);
        process.exit(1);
    });
