import nodemailer from 'nodemailer'

const sendmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'anassust.scw@gmail.com',
      pass: 'acyv lugf agqt mnno',
    },
  })

  await transporter.sendMail({
    from: '"Tour and Travel', // sender address
    to, // list of receivers
    subject, // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  })
}

export default sendmail
