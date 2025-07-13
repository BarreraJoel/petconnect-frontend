
export interface Paginate {
    current_page: number,
    data: any[],
    first_page_url: string,
    last_page: number,
    from: number,
    last_page_url: string,
    links: [
        {
            "url": string | null,
            "label": string,
            "active": boolean
        }
    ],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}
