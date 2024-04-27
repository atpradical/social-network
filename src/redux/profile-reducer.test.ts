import {addPostAC, deletePost, ProfileState, profileReducer} from "./profile-reducer";

it('length of posts should be incremented', () => {
    const action = addPostAC('it-kamasutra.com')
    const state: ProfileState = {
        posts: [
            {id: 1, post: 'Hi how are you?', likesCount: 5},
            {id: 2, post: 'this is my first comment', likesCount: 2},
            {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
            {id: 4, post: 'BEST social network', likesCount: 1},
        ],
        profile: null,
        status: ''
    }
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
})

it('message of ne post should be correct', () => {
    const action = addPostAC('it-kamasutra.com')
    const state: ProfileState = {
        posts: [
            {id: 1, post: 'Hi how are you?', likesCount: 5},
            {id: 2, post: 'this is my first comment', likesCount: 2},
            {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
            {id: 4, post: 'BEST social network', likesCount: 1},
        ],
        profile: null,
        status: ''
    }
    const newState = profileReducer(state, action)
    expect(newState.posts[4].post).toBe('it-kamasutra.com')
})

it('after delete length of posts should be decrement', () => {
    const action = deletePost(1)
    const state: ProfileState = {
        posts: [
            {id: 1, post: 'Hi how are you?', likesCount: 5},
            {id: 2, post: 'this is my first comment', likesCount: 2},
            {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
            {id: 4, post: 'BEST social network', likesCount: 1},
        ],
        profile: null,
        status: ''
    }
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})

it('after delete length of posts should not be changed in case of incorrect post id', () => {
    const action = deletePost(1001)
    const state: ProfileState = {
        posts: [
            {id: 1, post: 'Hi how are you?', likesCount: 5},
            {id: 2, post: 'this is my first comment', likesCount: 2},
            {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
            {id: 4, post: 'BEST social network', likesCount: 1},
        ],
        profile: null,
        status: ''
    }
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})