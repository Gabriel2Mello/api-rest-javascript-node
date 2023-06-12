import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log();
  console.log('Server executing...');
  console.log(`Access: http://localhost:${port}`);
});
