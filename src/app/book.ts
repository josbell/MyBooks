export class Book {
    constructor(
        public id: number,
        public name,
        public isbn = '',
        public authors = [],
        public categories = [],
        public description = '',
        public imageLink = '',
        public notes = [],
        public tags = []
    ) { }
}
