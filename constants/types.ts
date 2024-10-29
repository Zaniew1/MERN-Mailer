export interface NodeMailerInterface {
  send(sendingOptions: ExtendedMailType): Promise<boolean>;
  sendWelcome(options: BasicMailType): Promise<boolean>;
  sendResetPassword(options: BasicMailType): Promise<boolean>;
}

export interface ExtendedMailType extends BasicMailType {
  message?: string;
  subject?: string;
  html?: string;
  attachments?: {
    content?: string;
    filename?: string;
    type?: string;
    disposition?: string;
  }[];
}
export interface BasicMailType {
  name: string;
  email: string;
  url?: string;
}
