type StringKeyValueObject = { [key: string]: string }
type StringArrayKeyValueObject = {[key: string]: string[]}

type PaginatedApiResult = {
    current_page: number,
    data: StringKeyValueObject[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: {
        url: string?,
        label: string,
        active: boolean
    }[],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string?,
    to: number,
    total: number
}

type ProfileApiResult = {
    name: string,
    email: string,
    email_verified_at: Date,
    is_admin: boolean
}
