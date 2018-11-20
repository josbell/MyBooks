import * as _ from 'lodash';

export class Book {
    public key  = '';
    public id  = '';
    public title  = '';
    public authors = '';
    public categories: string[] = [];
    public description  = '';
    public imageLinks: any = {};
    public notes: string[] = [];
    public tags: string[] = [];

    constructor(obj: Object = {}) {
        _.assign(this, _.pick(obj, _.keys(this)));
    }

    copy(): Book {
        return _.cloneDeep(this);
    }
}
