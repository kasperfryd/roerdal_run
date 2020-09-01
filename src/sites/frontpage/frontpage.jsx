import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from "../../context/ContextProvider"
import GridBox from '../../components/gridbox/gridbox'
import DOMPurify from 'dompurify'
import Carousel from '../../components/carousel/carousel'
import Style from './frontpage.module.scss'


function FrontPage(){
    const {getPageContent, setPageData, pageData, allRunData} = useContext(AppContext);

    useEffect(() => {
        getPageContent(1)
        setPageData(pageData)
    }, [])

    const tease = (string) => {
        let shortenedString = string.substring(0, 180);
        return shortenedString + "..."
    }

    console.log(pageData)

    return (
        <section className={Style.mainContainer}>
            <Carousel/>
            <article className={Style.gridContainer}>
            
            <GridBox columns={1} rows={1} child = {
                <>
                <div>
                    <h2>{pageData.item && pageData.item.title}</h2>
                    <p>{pageData.item && pageData.item.teaser}</p>
                </div>
              </>
            }/>

            <GridBox child={
                <>
                <article className={Style.routeText}>
                <h2>Ruter</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </article>
                <GridBox columns={3} child={
                    allRunData.items && allRunData.items.map((item, index) => {
                       return ( 
                        <article className={Style.gridItem}>
                            <h2>{item.title}</h2>
                            {<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(tease(item.description))}}></p>}
                             <button>Tilmeld {item.title}</button>
                        </article>
                       )
                    })
                }/>
            </>
            }/>
            </article>
        </section>
    )
}

export default FrontPage