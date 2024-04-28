import {follow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {Response, RESULT_CODE} from "../api/api";
import {AxiosResponse} from "axios";

jest.mock("../api/users-api");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: Response = {
    data: {},
    messages: [],
    fieldsErrors: [],
    resultCode: RESULT_CODE.SUCCESS
}

// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result));

//todo: why response in users-reducer.ts is undefined ?

// test("", async () => {
//     const thunk = follow(1)
//     const dispatchMock = jest.fn()
//
//     // @ts-ignore
//   thunk(dispatchMock)
//     //expect(dispatchMock).toBeCalledTimes(3)
// })