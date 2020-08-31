import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from "../../context/ContextProvider"
import GridBox from '../../components/gridbox/gridbox'
import DOMPurify from 'dompurify'
import Carousel from '../../components/carousel/carousel'


function FrontPage(){
    const {getPageContent, setPageData, pageData} = useContext(AppContext);

    useEffect(() => {
        getPageContent(1)
        setPageData(pageData)
    }, [])

    console.log(pageData)

    return (
        <section>
            <Carousel delay={400}/>
            <GridBox width="50%" child = {
                <>
                    <h2>{pageData.item && pageData.item.title}</h2>
                    <p>{pageData.item && pageData.item.teaser}</p>
                    {pageData.item && <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(pageData.item.content)}}></p>}
                </>
            }/>
        </section>
    )
}

export default FrontPage