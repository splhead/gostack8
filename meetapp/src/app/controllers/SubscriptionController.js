import * as Yup from 'yup';
// import { isBefore, startOfHour, parseISO } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async index(req, res) {
    const subscribedMeetups = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: [],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'location', 'date'],
        },
      ],
    });

    return res.json(subscribedMeetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const meetup = await Meetup.findByPk(req.body.meetup_id);

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup already happened.' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You can not subscribe in, you are the organizer!' });
    }

    const meetupsSubscribed = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['date'],
        },
      ],
    });

    return res.json(meetupsSubscribed);
  }
}

export default new SubscriptionController();
