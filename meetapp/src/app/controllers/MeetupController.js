import * as Yup from 'yup';
import { isBefore, startOfHour, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
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

    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists.' });
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

    const hourStart = startOfHour(meetup.date);

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'It does not back time travel permitted :)' });
    }

    await meetup.destroy();

    return res.json();
  }
}

export default new MeetupController();
