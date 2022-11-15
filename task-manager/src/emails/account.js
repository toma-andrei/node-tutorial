const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andreitoma104@gmail.com",
    subject: "Thanks for joining",
    text: `Welcome in the task-manager app, ${name}`,
  });
};

const sendDeleteEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andreitoma104@gmail.com",
    subject: "Thanks for joining",
    text: `Hello, ${name}! Let us now why you are leaving`,
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendDeleteEmail: sendDeleteEmail,
};
