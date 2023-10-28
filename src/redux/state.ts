export type MessagesDataType = {
    id: string,
    message: string
}
export type DialogsDataType = {
    id: string,
    name: string,
}
export type PostDataType = {
    id: string,
    message: string,
    likesCount: number
}
export type profilePageType = {
    postsData: PostDataType[],
}
export type DiaologsPageType = {
    messagesData: MessagesDataType[],
    dialogsData: DialogsDataType[],
}
export type StateType = {
    profilePage: profilePageType
    dialogsPage: DiaologsPageType
}

export const state: StateType = {
    profilePage: {
        postsData: [
            {id: "1", message: 'Hi, how are you', likesCount: 12},
            {id: "1", message: 'It\'s my first post', likesCount: 11},
            {id: "1", message: 'bla bla bla bla', likesCount: 1},
            {id: "1", message: 'yoooohooo', likesCount: 101},
        ],
    },
    dialogsPage: {
        messagesData: [
            {id: "1", message: 'Hi'},
            {id: "2", message: 'How is your it-Kamasutra'},
            {id: "3", message: 'yo'},
            {id: "4", message: 'yo'},
            {id: "5", message: 'yo'},
        ],
        dialogsData: [
            {id: "1", name: 'Ivan'},
            {id: "2", name: 'Dimych'},
            {id: "3", name: 'Andrey'},
            {id: "4", name: 'Sveta'},
            {id: "5", name: 'Sasha'},
            {id: "6", name: 'Viktor'},
            {id: "7", name: 'Valera'},
        ],
    },
}
