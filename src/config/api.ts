export type Timestamp = string;

interface APIResponse<T> {
    code: number;
    data: T;
}

interface APISchema<T extends { req: {} | undefined, res: {} }> {
    req?: T['req'];
    res: APIResponse<T['res']>;
}

export interface APIGet {
    '/search':APISchema<{
       req: undefined,
       res: {
           exchangeRate: number
       }
    }>,
    '/news': APISchema<{
        req: undefined,
        res: {
            title: string,
            date: Timestamp,
            url:  string
        }[]
    }>,
    '/activity': APISchema<{
        req: undefined,
        res: {
            title: string,
            start_date: Timestamp,
            end_date: Timestamp,
            id: string,
            location: string
        }[]
    }>
}