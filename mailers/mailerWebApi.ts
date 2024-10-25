import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { MAILER_STATUS, MAILER_WEBAPI_TEST_TOKEN, MAILER_WEBAPI_PROD_TOKEN, MAILER_TEST_FROM, MAILER_PROD_FROM } from "../constants/env";
import sgMail from "@sendgrid/mail";
import { NodeMailerInterface, ExtendedMailType, BasicMailType } from "../types";

export default class WebApiMailer implements NodeMailerInterface {
  constructor() {}
  async send(options: ExtendedMailType) {
    // sendgrid API - prod ready
    if (MAILER_STATUS === "prod") {
      return this.sendProd(options);
    }
    // nodemailer - test API
    if (MAILER_STATUS === "dev") {
      this.createNewTransport()
        .sendMail({
          from: MAILER_TEST_FROM,
          to: options.email,
          subject: options.subject || "Brak tematu",
          text: options.message || "Brak wiadomości",
          category: "Notification",
          sandbox: true,
        })
        .then(console.log, console.error);
    }
  }
  private createNewTransport() {
    return nodemailer.createTransport(
      MailtrapTransport({
        token: MAILER_WEBAPI_TEST_TOKEN,
        testInboxId: 2352716,
      })
    );
  }
  public async sendWelcome(options: BasicMailType) {
    const extendedOptions = { ...options, template: "welcome", subject: "Welcome in my application" };
    await this.send(extendedOptions);
  }
  public async sendResetPassword(options: BasicMailType) {
    const extendedOptions = { ...options, template: "reset", subject: "It seems that you want to reset your password" };
    await this.send(extendedOptions);
  }
  private async sendProd(options: ExtendedMailType) {
    const attachments = options.attachments
      ? options.attachments.map((attachment) => ({
          content: attachment.content || "",
          filename: attachment.filename || "",
          type: attachment.type || "",
          disposition: attachment.disposition || "attachment",
        }))
      : [];

    const sendOptions = {
      to: options.email,
      from: MAILER_PROD_FROM,
      attachments: attachments.length ? attachments : undefined,
      subject: options.subject || "No Subject",
      text: options.message || "Brak wiadomości",
      html: options.html || "asd",
      category: "Notification",
    };
    sgMail.setApiKey(MAILER_WEBAPI_PROD_TOKEN);
    try {
      await sgMail.send(sendOptions);
    } catch (e: any) {
      console.log(e.response.body.errors);
    }
  }
}
