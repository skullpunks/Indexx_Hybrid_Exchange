import React, { useEffect, useState } from 'react'
import './IndexBlog.css';
// import Footer from '../Footer/Footer';
import ShortenText from '../../utils/ShortenText';
import ToText from '../../utils/ToText';
import { getAllPost } from '../../services/blogAPI';
import LoadingSpinner from '../Spinner/LoadingSpinner';

export interface posts {
    pubDate: string;
    title: string;
    thumbnail: string;
    description: string;
    link: string;
    categories: [];
}


export interface apiPosts {
    id: string;
    tags: string[];
    claps: number;
    last_modified_at: Date;
    published_at: Date;
    url: string;
    image_url: string;
    lang: string;
    publication_id: string;
    word_count: number;
    title: string;
    reading_time: number;
    responses_count: number;
    voters: number;
    topics: string[];
    author: string;
    subtitle: string;
}

export const IndexBlog = () => {
    const [itemRows1, setItemRows1] = useState<apiPosts[]>([]);
    const [loadings, setLoadings] = useState<boolean>(true);


    const onClickHandler = (path: any) => {
        window.open(`${path}`);
    };

    let mediumURL =
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Indexx";

    useEffect(() => {
        getAllPost().then((res) => {
            setItemRows1(res);
            setLoadings(false);

        });

    }, [mediumURL]);

    return (
        <div>
            <div className=' blog_container container' style={{ paddingBottom: 200 }}>
                <div className="margin-t-2x blog_container_header">
                    <h1 className='font_60x'>Blog</h1>
                </div>
                <div className="margin-t-2x blog_container_main">
                    {loadings ? <LoadingSpinner /> :
                        itemRows1[0] &&
                        <div className='d-flex flex-justify-between margin-b-3x padding-b-3x row' onClick={() => onClickHandler(itemRows1[0]?.url)}>
                            <div className='blog_flipicon_image  col-lg-8 col-md-12'><img src={itemRows1[0]?.image_url} alt="personFlipCoin" className='w-100' /></div>
                            <div className='blog_flipicon_image_content col-lg-4 col-md-12'>
                                <p className='font_40x padding-b-2x'>{itemRows1[0]?.title}</p>
                                <p className='font_23x'>  {ShortenText(ToText(itemRows1[0]?.subtitle), 0, 120) + "..."}</p>
                            </div>
                        </div>
                    }
                    <div className='d-flex flex-justify-between flex-wrap row blog_Responsive'>
                        {itemRows1.length > 1 &&
                            itemRows1.map((post, index) => {
                                if (index === 0) return "";
                                return <div className=' border-1x margin-b-2x col-lg-6 col-md-12 col-sm-12 padding-0' onClick={() => onClickHandler(post?.url)}>
                                    <img src={post?.image_url} alt="IndexPreSaleIcon" className='width-100 height-100' />
                                    <p className='font_40x padding-lr-2x padding-t-1x'>{ShortenText(ToText(post?.title), 0, 50) + "..."}</p>
                                    <p className='font_23x padding-lr-2x margin-t-2x margin-b-3x '> {ShortenText(ToText(post.subtitle), 0, 120) + "..."}</p>
                                    <span className='font_20x text-center d-block padding-b-1x'>{new Date(post?.published_at).toDateString()} - 2 min read</span>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default IndexBlog;
