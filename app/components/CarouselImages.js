import React from 'react'
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

export default function CarouselImages(props) {
    const {arrayImages, height, width} = props

    const renderItem = ({item, index}) => {
        return(<Image style={width, height} source={{uri: item}}/>)
    }
        return (
            <Carousel
                layout={"stack"}
                data={arrayImages}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
            />
        );
}
