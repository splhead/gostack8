import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Queue from '../../lib/Queue';

import SubscribeMail from '../jobs/SubscribeMail';

class SubscriptionController {
  async index(req, res) {
    const subscribedMeetups = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'location', 'date'],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscribedMeetups);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({ error: 'The meetup does not exists.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup already happened.' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You can not subscribe in, you are the organizer!' });
    }

    const checkDate = await Subscription.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(400).json({
        error: 'You already subscribed in other meetup with same hour.',
      });
    }

    const subscription = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    await Queue.add(SubscribeMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
