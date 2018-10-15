import { makeCustomDecorator } from 'at-json';
import { Utils } from '../utils/utils';

export const JsonDate = makeCustomDecorator(
    Utils.formatDate,
    Utils.parseDate
);
