const { SiweMessage } = require('siwe');

app.post('/api/verify', async (req, res) => {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);
  const fields = await siweMessage.validate(signature);
  req.session.siwe = fields;
  res.send({ ok: true });
});
