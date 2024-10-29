# Info

## Title
NODE-Mailer

## Description
 The purpose of this application is to provide a secure, comprehensive and fast package containing the functionality of sending emails.  During the development of my other projects, I noticed that I was missing a mailer with interface simple to use. Therefore, I decided to create this application. It includes 2 ways to send emails:
- API
- SMTP

Each way contains its own class with a common interface. Main class contains (for now) 3 methods:
- send
- sendWelcome
- sendResetPassword

Send method serves as custom method to send whatever message You like, including attachments, custom html, subject, text etc.

SendWelcome is a predefined method that sends emails when new user is being created. Mail will contain subject, welcome text and predefined HTML template that will provide beautiful message. All You need to pass is email, name and url to redirect. 

SendResetPassword as well as SendWelcome is predefined template message that is being sent when user tries to reset his password. All You need to pass is email, name and url to redirect.

# Key features

This package offers 2 classes to export from the mailer.ts file.
One is SMTPMailer and the other is ApiMailer.
User can simultaneously use both classes. Both classes also have a test and production sending option.
They depend on the defined environment variable MAILER_STATUS  

# Installation instructions
1. Navigate to folder where you want this package 
3. git clone https://github.com/Zaniew1/NODE-Mailer.git
4. cd **NODE-Mailer**
5. npm i

# Environment variables
This project contains many environment variables. This allows you to easily set all the options of sendgrid and nodemailer.  The key is to configure them correctly.
Below are all the necessary variables:

| Variable                 | Type       |
|--------------------------|------------|
| MAILER_STATUS            | dev or prod |
| MAILER_COMPANY_NAME      | string     |
| MAILER_DOMAIN_NAME       | string     |
| MAILER_PROD_USERNAME     | string     |
| MAILER_PROD_PASSWORD     | string     |
| MAILER_PROD_SERVICE      | SendGrid     |
| MAILER_PROD_FROM         | mail       |
| MAILER_TEST_FROM         | mail        |
| MAILER_TEST_USERNAME     | string     |
| MAILER_TEST_PASSWORD     | string     |
| MAILER_TEST_HOST         | sandbox.smtp.mailtrap.io or sandbox.api.mailtrap.io    |
| MAILER_TEST_PORT         | 2525     |
| MAILER_WEBAPI_TEST_TOKEN | string     |
| MAILER_WEBAPI_PROD_TOKEN | string     |

# Setup instructions

In order to get  MAILER_PROD_USERNAME and MAILER_PROD_PASSWORD, MAILER_WEBAPI_PROD_TOKEN you have to:
- sign in at [Link Text](https://sendgrid.com/en-us/) 
- log in to a dashboard
- go to *Settings* and click *Sender Authentication*
- now create a sender (pass a mail, adress and where to reply your mails)
- click *Email Api* at left nav bar, then click Integration guide
- now choose what kind of mailer you need SMTP/API
- here you need to create an API key
- if you choose API then its your MAILER_WEBAPI_PROD_TOKEN
- if you choose SMTP then its your MAILER_PROD_PASSWORD


In order to get MAILER_TEST_USERNAME and MAILER_TEST_PASSWORD you have to:
- sign in at [Link Text](https://mailtrap.io/home) 
- log in to a dashboard
- on the left nav menu click *Email Testing*, go to inboxes
- create new Project
- click on your projects name
- here you have defined username (MAILER_TEST_USERNAME) and password (MAILER_TEST_PASSWORD) for your testing mailer.

# Usage examples

```
import {SMTPMailer} from "./NODE-Mailer/mailer.ts";

SmtpMailer.send({name: "test", subject: "test", email: "test@test.com"});

ApiMailer.sendWelcome({name:"test", email: "test@test.com"});
```