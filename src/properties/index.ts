export class FindOptions {
    page: number;
    limit: number;
    query: any;
    sortBy: string;
    order: number;

    constructor ({ page, limit, query, sort, order } : { page?: string, limit?: string, query?: string, sort?: string, order?: string }) {
        this.page = page != undefined ? parseInt(page) : 1;
        this.limit = limit != undefined ? parseInt(limit) : 10;
        this.sortBy = sort != undefined ? sort : 'createdAt';
        this.order = order != undefined ? parseInt(order) : -1;
        this.query = new RegExp(query != undefined ? query : '', "gi");
    }
}