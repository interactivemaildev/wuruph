import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import axios from 'axios'
import requestIp from 'request-ip'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';

const verifyRecaptcha = async (token: string, ipaddress: string) => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY
  const response = await axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
      secret: secretKey,
      response: token,
      remoteip: ipaddress,
    }
  });
  return response.data
};

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST })
    return
  }

  console.log('body', req.body)
  
  try {
    const { email, name, address, phone, product, token } = req.body
    if (!email || !name || !address || !phone || !product || !token) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST })
      return
    }

    const detected_ip = requestIp.getClientIp(req);
    const response = await verifyRecaptcha(token, detected_ip)
    console.log('response', response)
    if (response.success) {
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.MAILER_PIN,
        },
        secure: true,
      })

      const mailData = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: `Message From ${name} (${email})`,
        text: "Message From Wuruph Website",
        html: `<h4 style="margin-top:0;">Message From ${name} (${email})</h4>
          <p style="margin:0;">Phone Number: ${phone}</p>
          <p style="margin:0;">Email: ${email}</p>
          <p style="margin:0;">Address: ${address}</p>
          <div style="display:flex;">
            <p style="margin:0;">Message:</p>
            <div style="white-space:pre-wrap;padding-left:5px;">${product}</div>
          </div>
        `,
      }

      transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Info', info);
        }
      })

      res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
      return
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST })
      return
    }
  } catch (error) {
    console.log('ERRRRROr', error);
    res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST })
  }
}