import Mail from '../../lib/Mail';

class SubscribeMail {
  get key() {
    return 'SubscribeMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `Novo inscrito em ${meetup.title}`,
      // text: 'Novo inscrito.',
      template: 'subscribe',
      context: {
        organizer: meetup.organizer.name,
        meetup: meetup.title,
        name: user.name,
        email: user.email,
      },
    });
  }
}

export default new SubscribeMail();
