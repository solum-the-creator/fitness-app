import { Moment } from 'moment';

export const isPastDate = (date: Moment) => {
    return date.isSameOrBefore(new Date(), 'day');
};
