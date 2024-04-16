import { INVITE_STATUS } from '@constants/constants';
import { TrainingPartner } from '@redux/api/types';
import moment from 'moment';

export const sortByName = (a: TrainingPartner, b: TrainingPartner) => {
    const [aFirstName, aLastName] = a.name.split(' ');
    const [bFirstName, bLastName] = b.name.split(' ');

    if (aFirstName !== bFirstName) {
        return aFirstName.localeCompare(bFirstName);
    }

    return aLastName.localeCompare(bLastName);
};

export const sortByStatus = (a: TrainingPartner, b: TrainingPartner) => {
    if (a.status === 'accepted' && b.status !== 'accepted') {
        return -1;
    }
    if (a.status !== 'accepted' && b.status === 'accepted') {
        return 1;
    }
    if (a.status === 'rejected' && b.status !== 'rejected') {
        return 1;
    }
    if (a.status !== 'rejected' && b.status === 'rejected') {
        return -1;
    }

    return 0;
};

export const sortByStatusAndName = (a: TrainingPartner, b: TrainingPartner) => {
    if (a.status === INVITE_STATUS.accepted && b.status !== INVITE_STATUS.accepted) {
        return -1;
    }
    if (a.status !== INVITE_STATUS.accepted && b.status === INVITE_STATUS.accepted) {
        return 1;
    }
    if (a.status === INVITE_STATUS.rejected && b.status !== INVITE_STATUS.rejected) {
        return 1;
    }
    if (a.status !== INVITE_STATUS.rejected && b.status === INVITE_STATUS.rejected) {
        return -1;
    }

    if (!a.name && !b.name) {
        return 0;
    }
    if (!a.name) {
        return -1;
    }
    if (!b.name) {
        return 1;
    }

    const [aFirstName = '', aLastName = ''] = a.name.split(' ');
    const [bFirstName = '', bLastName = ''] = b.name.split(' ');

    if (aFirstName !== bFirstName) {
        return aFirstName.localeCompare(bFirstName);
    }

    return aLastName.localeCompare(bLastName);
};

export const splitNameBySearch = (name: string, searchValue: string) => {
    const index = name.toLowerCase().indexOf(searchValue.toLowerCase());

    if (index === -1) {
        return { prefix: '', highlight: '', suffix: name };
    }

    return {
        prefix: name.substring(0, index),
        highlight: name.substring(index, index + searchValue.length),
        suffix: name.substring(index + searchValue.length),
    };
};

export const sortByWeekDay = <T extends { date: string }>(data: T[]): T[] =>
    [...data].sort((a, b) => moment(a.date).isoWeekday() - moment(b.date).isoWeekday());
