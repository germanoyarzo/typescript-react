export interface Sub {
    nick: string
    avatar: string
    subMonths: number
    description?: string
}

export interface SubsResponseFromApi {
    nick: string
    months: number
    profileUrl: string
    description?: string
}