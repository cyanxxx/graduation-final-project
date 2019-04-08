export type Timestamp = string;
export type UNIXTimestamp = number;
export type url = string;
export namespace Resdata{
    export interface menu{
        location: string,
        budget_default: number,
        budget_lunch: number,
        name: string,
        name_ja: string,
        category: string,
        thumbnail: string,
        id: string,
        url: string,
        address: string
        access: string,
        tel: string,
        fax: string
    }
    export interface sort{
        name: string,
        thumbnail: url,
        id: string,
        subSort:detailSort[]
    }
    export interface detailSort{
        name: string,
        id: string,
    }
    export interface location{
        cn_name: string,
        children: detailLocation[],
        name:string
    }
    export interface detailLocation{
        name: string,
        id: string
    }
    export interface scenery{
        cn_title: string,
        id: number,
        lists: scenerySpot[]
    }
    export interface list{
        loaction: string,
        transport?: number,
        startTime?: any,
        endTime?: any,
        info?: string
    }
    export interface tripList{
        id: number,
        start_date: string,
        end_date: string,
        lst: list[]
    }
    export interface trip{
        id: number,
        name: string,
        start_date: string,
        end_date: string,
        author: string
    }
    export interface scenerySpot {
        title: string,
        en_title: string,
        date: string,
        area: string,
        rank: number,
        img:  string,
    }
    export interface weather {
        temp: number,
        icon: string,
        city: string,
        description: string,
        sunrise?: UNIXTimestamp,
        sunset?: UNIXTimestamp,
        wind_speed?: number,
        humidity?: number,
        temp_min?: number,
        temp_max?: number,
    }
}


interface APISchema<T extends { req: {} | undefined, res: {} }> {
    req?: T['req'];
    res: T['res'];
}

export interface APIGet {
    '/currency':APISchema<{
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
    }>,
    '/restaurant/list': APISchema<{
        req: {
            id?: string,
            page?: number,
            hot?: number,
            search?: string
        },
        res: {
            results:Resdata.menu[],
            next: string,
            count: number  
        }
    }>,
    '/restaurant/sort': APISchema<{
        req: undefined,
        res: Resdata.sort[]
    }>,
    '/restaurant/location': APISchema<{
        req: undefined,
        res: Resdata.location[]
    }>,
    '/scenery/list': APISchema<{
        req: undefined,
        res: Resdata.scenery[]
    }>,
    '/scenery/recommand': APISchema<{
        req: undefined,
        res: Resdata.scenerySpot[]
    }>,
    '/list': APISchema<{
        req: undefined,
        res: Resdata.list[]
    }>,
    '/trip/list': APISchema<{
        req: {
            id: number
        },
        res: Resdata.tripList[]
    }>,
    '/trip': APISchema<{
        req: {
            own: boolean
        },
        res: Resdata.trip[]
    }>,
    '/user': APISchema<{
        req: undefined,
        res: {
            name: string
        }
    }>,
    '/weather': APISchema<{
        req: {
            city: string
        },
        res: Resdata.weather
    }>
}

export interface APIPost {
    '/login': APISchema<{
        req: {
            username: string,
            password: string
        },
        res: {
            token: string
        }
    }>,
    '/register': APISchema<{
        req: {
            username: string,
            password: string
        },
        res: {
            token: string
        }
    }>,
    '/trip/create': APISchema<{
        req: {
            name: string,
            start_date: string,
            end_date: string 
        },
        res: {
            id: number
        },
    }>,
    '/item':  APISchema<{
        req: {
            loaction : string,
            ftrip_id : number,
            transport: string,
            startTime?: number, 
            endTime?: number,
            info?: string, 
        },
        res: {
            id: number
        }
    }>
}
