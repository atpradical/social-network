let rerenderEntireTree = (...args: any) => {
    console.log('STATE WAS CHANGED!!!!!!!!!!!!!!!!!')
}

export const state: StateType = {
    profilePage: {
        posts: [
            {id: 1, post: 'Hi how are you?', likesCount: 5},
            {id: 2, post: 'this is my first comment', likesCount: 2},
            {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
            {id: 4, post: 'BEST social network', likesCount: 1},
        ],
        newPostText: 'it-kamasutra.com'
    },
    dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your IT kamasutra?'},
            {id: 3, message: 'Yo!!'},
            {id: 4, message: 'Yo!!!!'},
        ],
        dialogs: [
            {id: 1, name: 'Ivan'},
            {id: 2, name: 'Alexandra'},
            {id: 3, name: 'Anatoly'},
            {id: 4, name: 'Sveta'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Valera'}
        ],
    }
}

export const addPost = (): void => {
    const newPost: PostsType = {
        id: 5,
        post: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export const updateNewPostText = (newText: string): void => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export const subscribe = (observer: any) => {
    rerenderEntireTree = observer
}


//types:
export type StateType = {
    profilePage: {
        posts: PostsType[]
        newPostText: string
    }
    dialogsPage: {
        dialogs: DialogsType[]
        messages: MessagesType[]
    }
}
export type PostsType = {
    id: number
    post: string
    likesCount: number
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

//@ts-ignore
window.state = state