import React, {FC, useState} from 'react';
import s from "./Paginator.module.css";
import cn from 'classnames';

export const Paginator: FC<Props> = ({
                                         totalItemsCount, pageSize,
                                         onPageChanged, currentPage,
                                         portionSize = 10
                                     }) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p, index) => {
                        return <span key={index} className={cn({[s.selectedPage]: p === currentPage}, s.pageNumber)}
                                     onClick={() => {
                                         onPageChanged(p)
                                     }}>{p}</span>
                    })
            }
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber => portionNumber + 1)}>Next</button>}
        </div>
    )
}

//types:
type Props = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}