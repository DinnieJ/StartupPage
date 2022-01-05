import React, { useState } from "react";
import "./Article.css";
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DefaultImg from '../assets/img/default-article-img.jpg'

interface Props { 
    article: any
}

const Article = (props: any) => {

    const [hover, setHover] = useState(false)
    const modifiedTitle = React.useMemo(() => {
        let title = props.article.title.length < 60 || hover ? props.article.title : (props.article.title.substring(0, 60) + "...")
        return title
    }, [hover])
    return (
        <a
            className="flex items-end article w-80 h-80 cursor-pointer transition-all duration-100 ease-in-out rounded-xl my-4"
            href={props.article.url}
            style={{
                background: `url(${props.article.cover_image ?? DefaultImg})`,
                backgroundSize: "auto",
                backgroundPositionX: "center",
                backgroundPositionY: "60%",
                backgroundRepeat: "no-repeat",
            }}
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
        >
            <div className="detail flex flex-col justify-between h-1/3 w-full bg-gray-800 rounded-b-xl p-2 transition-all duration-100 ease-in-out">
                <p className="text-white text-base font-semibold">{modifiedTitle}</p>
                <div className="tags flex-wrap flex-grow-0">
                    {props.article.tag_list.map((item:any) => (
                        <Tag tag={item} key={item}/>
                    ))}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="fav flex flex-row items-center justify-between">
                        <FontAwesomeIcon icon={faHeart} className="text-pink-700 text-xl mr-1"/>
                        <p className="text-white font-semibold text-sm">{props.article.public_reactions_count}</p>
                    </div>
                    <div className="author text-white">
                        {props.article?.user.name}
                    </div>
                </div>
            </div>
        </a>
    );
};


interface ITagProps {
    tag: string
}

const Tag = (props: ITagProps) => {
    const normalizeTitle = React.useMemo(() => {
        return `${props.tag.substring(0,1).toUpperCase()}${props.tag.substring(1, props.tag.length)}`
    },  [])
    return <div className="text-white text-xs m-1 bg-pink-800 rounded-xl px-2 py-0.5">{normalizeTitle}</div>
}

export default Article;
