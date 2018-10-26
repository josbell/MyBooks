export class Book {
    constructor(
        public id: string,
        public title: string,
        public authors: string[] = [],
        public categories: string[] = [],
        public description: string = '',
        public imageLink: any = {},
        public notes: string[] = [],
        public tags: string[] = []
    ) { }
}
