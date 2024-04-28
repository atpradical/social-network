import {followSuccess, unFollowSuccess, userReducer, UserState} from "./users-reducer";

let InitialState: UserState

beforeEach(() => {
        InitialState = {
            users: [
                {
                    id: 0, name: "Ivan 0", status: "status 10",
                    followed: false, photos: {small: null, large: null}
                }, {
                    id: 1, name: "Ivan 1", status: "status 1",
                    followed: false, photos: {small: null, large: null}
                }, {
                    id: 2, name: "Ivan 2", status: "status 2",
                    followed: true, photos: {small: null, large: null}
                }, {
                    id: 3, name: "Ivan 4", status: "status 3",
                    followed: true, photos: {small: null, large: null}
                },
            ],
            pageSize: 10,
            totalUsersCount: 200,
            currentPage: 1,
            isFetching: true,
            followingInProgress: [] as number[], //array of users ids
            filter: { term: '', friend: null as null | boolean},
        }
    }
)

test("Follow success", async () => {
    const newState = userReducer(InitialState, followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("Unfollow success", async () => {
    const newState = userReducer(InitialState, unFollowSuccess(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})
