import React, { Dispatch, SetStateAction } from 'react'
import PropTypes from 'prop-types'
import global from '../styles/global.module.scss'
const MAX_BUTTON = 9
const BUTTON_LEFT = (MAX_BUTTON - 1) / 2

interface Pagination {
  limit: number
  total?: number
  offset: number
  setOffset: Dispatch<SetStateAction<number>>
}
export const Pagination = ({limit, total, offset, setOffset }: Pagination) => {
  const currentPage = offset ? (offset/limit) + 1: 1
  const totalPages = total ? Math.ceil(total/limit): 1 //arredondar para cima 
  const firstPage = Math.max(currentPage - MAX_BUTTON, 1)



  return(
    <ul className={global.pagination}>
      {Array.from({ length: Math.min(MAX_BUTTON, totalPages)})
        .map((_, index) => index + firstPage)
        .map((page, index) => (
          <li key={index}>
            <button 
              onClick={() => setOffset((page - 1) * limit)}
              className={ page === currentPage ? global['__item--active'] : 'none'}
            >
              {page}
            </button>
          </li>
        ))
      }
    </ul>
  )
}

