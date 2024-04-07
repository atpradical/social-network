import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe('ProfileInfo Component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={()=>{}}/>)
        const instance = component.getInstance()
        // @ts-ignore
        expect(instance?.state.status).toBe('it-kamasutra.com')
    })

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={()=>{}}/>)
        const root = component.root
        const span = root.findByType('span')
        expect(span.children.length).not.toBeNull()
    })

    test('after creation <input> should be displayed', () => {
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={()=>{}}/>)
        const root = component.root

        expect(()=>{
            const input = root.findByType('input')
        }).toThrow()
    })

    test('<span> contain correct status', () => {
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={()=>{}}/>)
        const root = component.root
        const span = root.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com')
    })

    test('<input> should be displayed in edit mode instead of <span>', () => {
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={()=>{}}/>)
        const root = component.root
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('it-kamasutra.com')
    })

    test('callback should be executed', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'it-kamasutra.com'} updateUserStatus={mockCallback}/>)
        const instance = component.getInstance()
        //@ts-ignore
        instance?.deactivateEditMode()

        expect(mockCallback.mock.calls.length).toBe(1)
    })
})