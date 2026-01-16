import http from 'http';
import app from './app.ts';
const PORT = process.env.PORT;



const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
