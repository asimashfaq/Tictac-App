import app from './app';
process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});
process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
