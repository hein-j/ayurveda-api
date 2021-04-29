const bodyValidationSchema = require('../services/apiKey/bodyValidationSchema');
const saveAPIkey = require('../services/apiKey/saveAPIkey');
const sendEmail = require('../services/apiKey/sendEmail');

module.exports = async function (req, res) {
  
  // check if request is from admin
  if (!req.isAdmin) {
    res.status(401).json('You are not authorized');
    return;
  }

  // validate & format body
  const validation = bodyValidationSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json('Check your request body');
    return;
  }

  const email = validation.value.email;

  // save to database
  let keyObj;
  try {
    keyObj = await saveAPIkey(email);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
    return;
  }

  try {
    await sendEmail(keyObj);
  } catch (e){
    console.error(e)
    res.status(424).json({message: 'Could not email key', key: keyObj.key});
    return;
  }

  res.status(200).json(email);

}