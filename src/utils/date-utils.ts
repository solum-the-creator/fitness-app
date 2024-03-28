import { Moment } from 'moment';

export const isPastDate = (date: Moment) => date.isSameOrBefore(new Date(), 'day');
