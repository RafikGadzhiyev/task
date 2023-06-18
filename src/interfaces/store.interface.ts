export interface IPost {
    author: string
    content: string
    channel: string
    id: number
    date: string
    attachments: Array<IMedia>
    isFavorite: boolean
}

export interface IMedia {
    type: 'video' | 'image',
    url: string
}