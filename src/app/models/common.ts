import { Utils } from 'app/utils/utils';
import { makeCustomDecorator } from 'at-json';

export const JsonDate = makeCustomDecorator(
    Utils.formatDate,
    Utils.parseDate
);
