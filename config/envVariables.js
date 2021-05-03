exports.dbURL = process.env.DB_URL;

exports.adminAPIkeyObj = {
  email: process.env.ADMIN_EMAIL,
  key: process.env.ADMIN_KEY
}

exports.gmailObj = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  adminEmail: process.env.ADMIN_EMAIL
}

exports.docURL = process.env.DOC_URL