import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const where = {};
    const { page = 1 } = req.query;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['title', 'description', 'location', 'date'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const hourStart = startOfHour(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'It does not back time travel permitted :)' });
    }

    const meetup = Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    if (req.body.date) {
      const hourStart = startOfHour(parseISO(req.body.date));

      if (isBefore(hourStart, new Date())) {
        return res
          .status(400)
          .json({ error: 'It does not back time travel permitted :)' });
      }
    }

    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup already happened.' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Meetup organized by other user.' });
    }

    const { title, description, location, date } = await meetup.update(
      req.body
    );

    return res.json({
      title,
      description,
      location,
      date,
    });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists.' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Meetup organized by other user.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup already happened.' });
    }

    await meetup.destroy();

    return res.json();
  }
}

export default new MeetupController();
