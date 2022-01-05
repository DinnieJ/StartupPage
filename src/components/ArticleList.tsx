import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { getArticlesPagination } from '../api/api.devto'
import Article from './Article'
import './ArticleList.css'
interface Props {

}

const ArticleList = (props: Props) => {

    const [articles, setArticles] = useState<Array<any>>([])
    const [page, setPage] = useState<number>(1)
    const getArticles = useCallback(async () => {
        await getArticlesPagination(page).then(response => {
            let _articles = [...articles]
            response.data.forEach((item: any) => {
                _articles.push(item)
            })
            setArticles(_articles)
        })
    }, [page])

    const checkScroll = (e: any) => {
        if (e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight) {
            setPage(x => x + 1)
        }
    }
    useEffect(() => {
        getArticles()
    }, [page])
    return (
        <div className='flex flex-col h-full'>
            <div id="articles" className="flex h-full overflow-y-scroll flex-row flex-wrap justify-between p-4 w-3/4" onScroll={checkScroll}>
                {articles.map((item, i) => (
                    <Article article={item} key={i} />
                ))}
                <div className='w-full flex justify-center'>
                    <div className="lds-ring mx-auto">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ArticleList
