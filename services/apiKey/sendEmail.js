const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {gmailObj} = require('../../config/secrets')

// big thanks to https://www.youtube.com/watch?v=-rcRf7yswfM 

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  adminEmail
} = gmailObj;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

module.exports = async function (keyObj) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: adminEmail,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessTOKEN: accessToken
    }
  })

  const mailOptions = {
    from: `Ayurveda API 🌿 <${adminEmail}>`,
    to: keyObj.email,
    subject: 'Your Ayurveda API Key',
    html: `Hi there,<br><br>Your API key is:<br><b>${keyObj.key}</b><br><br>I'll contact you only in case of breaking changes.<br><br>Cheers,<br>Admin`,
    text: `Hi there, Your API key is ${keyObj.key}. I'll contact you only in case of breaking changes. Cheers, Admin`
  }

  const result = await transport.sendMail(mailOptions);
  return result;
}