import { NodeMailerInterface, ExtendedMailType, BasicMailType } from "./constants/types";
import SMTPMailer from "./mailers/mailerSMTP";
import WebApiMailer from "./mailers/mailerWebApi";
class Mailer implements NodeMailerInterface {
  private mailerClass: NodeMailerInterface;
  constructor(mailerClass: NodeMailerInterface) {
    this.mailerClass = mailerClass;
  }
  public async send(sendingOptions: ExtendedMailType) {
    return this.mailerClass.send(sendingOptions);
  }
  async sendWelcome(options: BasicMailType) {
    return this.mailerClass.sendWelcome(options);
  }
  async sendResetPassword(options: BasicMailType) {
    return this.mailerClass.sendResetPassword(options);
  }
}

export const SmtpMailer = new Mailer(new SMTPMailer());
export const ApiMailer = new Mailer(new WebApiMailer());
