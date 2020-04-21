
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const Hashes = require('jshashes');

const cors = require('cors')({
  origin: true
});

admin.initializeApp();

/**
 * Here we're using Gmail to send 
 */
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elddiablo001@gmail.com',
    pass: 'Avp99^2MOG'
  }
});

exports.sendRequest = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    // getting dest email by query string
    const req_email = req.query.req_email,
          req_body = req.query.req_body,
          hashed_email = new Hashes.MD5().hex(req_email);

    function RenderAdditionalText() {
      return `Additional Information from client: <b>${ req_body }</b>`;
    }

    const mailOptions = {
      from: "air-seaman@aviapromo.com.ua",
      to: "book@zhara.com.ua",
      subject: 'Air-Seaman-Contact-Request \n #' + hashed_email, // email subject
      html: `
            <p style="font-size: 16px;">
              Contact Request for following email: 
              <br />
              <b>${ req_email }</b>
              <br />
              ${ req_body && RenderAdditionalText() }
            </p>
        ` // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) 
        return res.send({errorText: erro.toString(), data: {
          success: false
        }});

      return res.send({data: {
        success: true,
        res: info.response
      }, errorText: null});
    });
  });
});