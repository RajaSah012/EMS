import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, Dimensions } from "react-native";

const ImageSlider = () => {
    const flatlistRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                });
            } else {
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index,
    });

    const carouselData = [
        {
            id: "01",
            image: require("../Images/slider_1.jpg"),
        },
        {
            id: "02",
            image: require("../Images/slider_2.jpg"),
        },
        {
            id: "03",
            image: require("../Images/slider_3.jpg"),
        },
    ];

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image
                    source={item.image}
                    style={{ height: 200, width: screenWidth }}
                />
            </View>
        );
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = scrollPosition / screenWidth;
        setActiveIndex(index);
    };

    const renderDotIndicators = () => {
        return carouselData.map((dot, index) => {
            return (
                <View
                    key={`dot-${index}`}
                    style={{
                        backgroundColor: index === activeIndex ? "green" : "red",
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}
                ></View>
            );
        });
    };

    return (
        <View style={{ marginTop: 20 }}>
            {/* Adding margin top to create a gap */}
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                }}
            >
                {renderDotIndicators()}
            </View>
        </View>
    );
};

export default ImageSlider;
