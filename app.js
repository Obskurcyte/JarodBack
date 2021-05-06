import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('/send', (req, res) => {


  console.log(req.body)
  const output = `
<p>Vous avez une nouvelle demande par email<p/>
<h3>Pour répondre au questionnaire, veuillez suivre ce lien : </h3>
<a href="http://localhost:3000/">Jarod</a>
`

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'maxetlea.dev@gmail.com', // generated ethereal user
      pass: 'Hello13012'
    },
  });

  console.log(req.body)
  // send mail with defined transport object
  let info = transporter.sendMail({
    from: `${req.body.emailsender}`, // sender address
    to: `${req.body.email}`,  // list of receivers
    subject: "Vous avez des questions entrantes", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body,
  });

  console.log("Message sent: %s", info.messageId);
})

app.use('/', (req, res, next) => {

  res.json('Thank you...')
})

app.listen(process.env.PORT || 8000, () => {

  console.log('Listening to port 8000')
})
