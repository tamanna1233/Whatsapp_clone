import dbconnect from './db/index.js';
import app from './app.js';

console.log('check 1');
dbconnect()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Something went wrong', err);
  });
