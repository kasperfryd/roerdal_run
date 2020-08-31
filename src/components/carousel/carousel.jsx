import React, { useState, useEffect } from 'react'
import Style from './carousel.module.scss'
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from 'react-icons/ri'
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import img4 from '../../images/img4.jpg'

  /** Carousel accepts these props
      * height (default 45vh)
      * items (object with array of items)
      * delay (in whole seconds - default 7 seconds)
  */
function Carousel(props) {
      // Carousel object (required prop for Carousel)
      const carouselItems = {
        item: [
            { img: img1},
            { img: img2},
            { img: img3},
            { img: img4},
        ]
    }


    const items = carouselItems
    const height = props.height
    const delay = props.delay || 8
    const [pos, setPos] = useState(0)

    const containerHeight = {
        height: height || "50vh",
    }

    const posHandler = (i) => {
        if (i === "decre") {
            let res = pos - 1
            if (res < 0) {
                setPos(items.item.length - 1)
            }
            else {
                setPos(pos - 1)
            }
        }
        if (i === "incre") {
            let res = pos + 1
            if (res >= items.item.length) {
                setPos(0)
            }
            else {
                setPos(pos + 1)
            }
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            posHandler("incre")
        }, delay + "000");
        return () => {
            clearTimeout(timer)
        }
    }, [pos])

    return (
        <section>
            {
                items.item.map((item, index) => {
                    return (
                    pos === index &&
                            <>
                            <div className={Style.cut}></div>
                            <section>
                                <figure className={Style.figurecontainer} style={{ ...containerHeight, backgroundImage: `url(${item.img})` }}>
                                    <RiArrowLeftCircleLine className={Style.buttonleft} onClick={() => { posHandler("decre") }} />
                                    <RiArrowRightCircleLine className={Style.buttonright} onClick={() => { posHandler("incre") }} />
                                </figure>
                            <figcaption className={Style.caption}>{item.text}</figcaption>
                            </section>
                            </>
                        )
                })
            }
        </section>
    )
}
export default Carousel