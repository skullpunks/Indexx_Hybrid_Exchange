import React, { useEffect, useState } from 'react'
import './IndexBlog.css';
import Footer from '../Footer/Footer';
import axios from 'axios';
import ShortenText from '../../utils/ShortenText';
import ToText from '../../utils/ToText';

export interface posts {
    pubDate: string;
    title: string;
    thumbnail: string;
    description: string;
    link: string;
    categories: [];
}

export const IndexBlog = () => {
    const [itemRows, setItemRows] = useState<posts[]>([]);

    const onClickHandler = (path: any) => {
        window.open(`${path}`);
    };
    let mediumURL =
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Indexx";

    useEffect(() => {
        axios
            .get(mediumURL)
            .then(async (res) => res.data)
            .then((data) => {
                const res = data.items; //This is an array with the content. No feed, no info about author etc..
                const posts = res.filter((item: any) => item.categories.length > 0);
                setItemRows(posts);
            });
    }, [mediumURL]);

    return (
        <div>
            <div className=' blog_container container' style={{ paddingBottom: 200 }}>
                <div className="margin-t-2x blog_container_header">
                    <h1 className='font_60x'>Blog</h1>
                </div>
                <div className="margin-t-2x blog_container_main">
                    {itemRows[0] &&
                        <div className='d-flex flex-justify-between margin-b-3x padding-b-3x row' onClick={() => onClickHandler(itemRows[0].link)}>
                            <div className='blog_flipicon_image  col-lg-8 col-md-12'><img src={itemRows[0].thumbnail} alt="personFlipCoin" className='w-100' /></div>
                            <div className='blog_flipicon_image_content col-lg-4 col-md-12'>
                                <p className='font_40x padding-b-2x'>{itemRows[0].title}</p>
                                <p className='font_23x'>  {ShortenText(ToText(itemRows[0].description), 0, 120) + "..."}</p>
                            </div>
                        </div>
                    }
                    <div className='d-flex flex-justify-between flex-wrap row blog_Responsive'>
                        {itemRows.length > 1 &&
                            itemRows.map((post, index) => {
                                if (index == 0) return "";
                                return <div className=' border-1x margin-b-2x col-lg-6 col-md-12 col-sm-12 padding-0' onClick={() => onClickHandler(post.link)}>
                                    <img src={post.thumbnail} alt="IndexPreSaleIcon" className='width-100' />
                                    <p className='font_40x padding-lr-2x padding-t-1x'>{post.title}</p>
                                    <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x '> {ShortenText(ToText(post.description), 0, 120) + "..."}</p>
                                    <span className='font_20x text-center d-block padding-b-1x'>{post.pubDate} - 2 min read</span>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default IndexBlog;
