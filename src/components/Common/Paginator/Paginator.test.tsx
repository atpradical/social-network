import {create} from 'react-test-renderer'
import {Paginator} from "./Paginator";

describe('Paginator compoment test', () => {
    test('Paginator pages count is 11 but should be shown only 10', () => {
        const component = create(<Paginator
            currentPage={1}
            pageSize={1}
            onPageChanged={() => {}}
            totalItemsCount={11}
            portionSize={10}/>)

        const root = component.root
        const span = root.findAllByType('span')
        expect(span.length).toBe(10)
    })

    test('if pages count is more than 10 -> button NEXT should be presented', () => {
        const component = create(<Paginator
            currentPage={1}
            pageSize={1}
            onPageChanged={() => {}}
            totalItemsCount={11}
            portionSize={10}/>)

        const root = component.root
        const button = root.findByType('button')
        expect(button.children.length).toBe(1)
    })
})