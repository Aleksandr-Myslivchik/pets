import { useMemo } from "react";


export const usePagination = (total: number, perPage: number, currentPage: number) => {


  return useMemo(() => {

    const pages = Math.ceil(total / perPage)

    if (pages <= 1) {
      return null
    }

    if (currentPage - 1 >= 4 && pages - currentPage >= 4) {
      return [ 1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pages ]
    }

    if (currentPage - 1 < 4 && pages - currentPage >= 4) {
      return [ 1, 2, 3, 4, 5, '...', pages ]
    }

    if (currentPage - 1 >= 4 && pages - currentPage < 4) {
      return [ 1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages ]
    }


  }, [ total, perPage, currentPage ])


}
