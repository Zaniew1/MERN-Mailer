export interface NodeMailerInterface {
  send(sendingOptions: ExtendedMailType): void;
  sendWelcome(options: BasicMailType): Promise<void>;
  sendResetPassword(options: BasicMailType): Promise<void>;
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
