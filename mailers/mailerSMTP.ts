import nodemailer from "nodemailer";
import {
  MAILER_PROD_PASSWORD,
  MAILER_PROD_USERNAME,
  MAILER_PROD_SERVICE,
  MAILER_STATUS,
  MAILER_PROD_FROM,
  MAILER_TEST_USERNAME,
  MAILER_TEST_PASSWORD,
  MAILER_TEST_HOST,
  MAILER_TEST_FROM,
  MAILER_TEST_PORT,
  MAILER_TEST_SERVICE,
} from "../constants/env";
import pug from "pug";
import { htmlToText } from "html-to-text";
import { NodeMailerInterface, ExtendedMailType, BasicMailType } from "../types";

export default class SMTPMailer implements NodeMailerInterface {
  private from: string = `BHP Project <${MAILER_STATUS === "prod" ? MAILER_PROD_FROM : MAILER_TEST_FROM}>`;
  constructor() {}
  public async send(sendingOptions: ExtendedMailType) {
    const mailOptions = {
      from: this.from,
      to: sendingOptions.email,
      subject: sendingOptions.subject,
      html: sendingOptions.html,
      text: sendingOptions.message ?? htmlToText(this.renderTemplate(sendingOptions)),
      attachments: sendingOptions.attachments,
    };
    await this.createNewTransport()?.sendMail(mailOptions);
  }
  private renderTemplate(sendingOptions: ExtendedMailType) {
    return pug.renderFile(`../views/${sendingOptions.html}.pug`, {
      name: sendingOptions.name,
      url: sendingOptions.url,
      subject: sendingOptions.subject,
    });
  }
  private createNewTransport() {
    if (MAILER_STATUS === "prod") {
      //sendgrid - ready
      return nodemailer.createTransport({
        service: MAILER_PROD_SERVICE,
        auth: {
          user: MAILER_PROD_USERNAME,
          pass: MAILER_PROD_PASSWORD,
        },
      });
    }
    //mailtrap - ready
    if (MAILER_STATUS === "dev") {
      return nodemailer.createTransport({
        host: MAILER_TEST_HOST,
        port: Number(MAILER_TEST_PORT),
        secure: false,
        auth: {
          user: MAILER_TEST_USERNAME,
          pass: MAILER_TEST_PASSWORD,
        },
      });
    }
  }
  public async sendWelcome(options: BasicMailType) {
    const html = this.renderTemplate({ ...options, html: "welcome" });
    const extendedOptions = { ...options, html, subject: "Welcome in my application" };
    await this.send(extendedOptions);
  }
  public async sendResetPassword(options: BasicMailType) {
    const html = this.renderTemplate({ ...options, html: "reset" });
    const extendedOptions = { ...options, html, subject: "It seems that you want to reset your password" };
    await this.send(extendedOptions);
  }
}
