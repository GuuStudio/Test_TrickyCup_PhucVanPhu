import React, { useState, useEffect, useRef } from "react";
import { View, ImageBackground, Image, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";


const GamePlay = () => {
    const [shuffling, setShuffling] = useState<boolean>(true);
    const [selectedCup, setSelectedCup] = useState<number | null>(null);


    const [ballPosition, setBallPosition] = useState<number>(Math.floor(Math.random() * 3));
    const [showBall, setShowBall] = useState<boolean>(false);
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);

    const cupAnimations = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
    const elevationAnimation = useRef(new Animated.Value(0)).current;

    const [gameResult, setGameResult] = useState<string | null>(null);

    useEffect(() => {
        if (shuffling) {
            const rotateAnimations = cupAnimations.map(animation =>
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(animation, {
                            toValue: 1,
                            duration: 1500,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animation, {
                            toValue: 0,
                            duration: 1500,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        })
                    ])
                )
            );
            const translateXAnimations = cupAnimations.map((animation) =>
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 3000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            );

            Animated.parallel([
                ...rotateAnimations,
                ...translateXAnimations
            ]).start(() => setAnimationFinished(true));

            const timerShuffling = setTimeout(() => {
                setShuffling(false);
            }, 3000);

            elevationAnimation.setValue(0);
            return () => {
                clearTimeout(timerShuffling);
                cupAnimations.forEach((anim) => anim.stopAnimation());
            };
        }
    }, [shuffling]);

    const handleCupPress = (index: number) => {
        if (animationFinished) {
            setSelectedCup(index);
            setSelectedCup(index);
            Animated.spring(elevationAnimation, {
                toValue: 1,
                useNativeDriver: true,
                tension: 50,
                friction: 7,
            }).start();
            if (index === ballPosition) {
                setShowBall(true);
                setGameResult('win');
            }
            else setGameResult('lose');
        }
    };
    const restartGame = () => {
        setBallPosition(Math.floor(Math.random() * 3));
        setSelectedCup(null);
        setShuffling(true);
        setShowBall(false);
        setGameResult(null);
        setAnimationFinished(false);
        Animated.timing(elevationAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            elevationAnimation.setValue(0);
        });
    };

    const rotateAnimation = cupAnimations.map(animation =>
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    );

    const translateX = (index: number) => {
        return cupAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100]
        });
    };

    const cupElevation = elevationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -150],
    });

    return (
        <ImageBackground source={require('../../assets/images/background.png')} className="flex-1" resizeMode="cover">
            <View className="flex-1 justify-center items-center">
                <View className=" absolute flex-row justify-around w-full">
                    {[0, 1, 2].map((cup, index) => (
                        <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
                            <Animated.Image
                                source={require('../../assets/images/plastic-cup.png')}
                                className={'w-[108px] h-[108px] top-[28px]'}
                                style={
                                    {
                                        transform: [
                                            { rotate: rotateAnimation[index] },
                                            { translateX: translateX(index) },
                                            { translateY: selectedCup === index ? cupElevation : 0 },
                                        ]
                                    }
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {showBall && (
                    <Image
                        source={require('../../assets/images/ball.png')}
                        className=" absolute bottom-[325px] w-[40px] h-[40px] ml-[45px]"
                        style={{ left: `${ballPosition * 33.33}%` }}
                    />
                )}

                {gameResult === 'win' && (
                    <Image
                        source={require('../../assets/images/you-win.png')}
                        className=" absolute top-[360px] w-[337px] h-[132px]"
                        resizeMode="contain"
                    />
                )}
                {gameResult === 'lose' && (
                    <Image
                        source={require('../../assets/images/you-lose.png')}
                        className=" absolute top-[360px] w-[337px] h-[132px]"
                        resizeMode="contain"
                    />
                )}

                {gameResult && (
                    <TouchableOpacity onPress={restartGame} >
                        <Image
                            source={require('../../assets/images/tap-to-restart.png')}
                            className=" w-[312px] h-[36px] top-[190px]"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

export default GamePlay;

