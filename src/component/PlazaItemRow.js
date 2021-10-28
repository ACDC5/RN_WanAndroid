import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
// import Touchable from "./Touchable";
import PropType from 'prop-types';

// const propType = {
//     item:PropType.object.isRequired
// }

class PlazaItemRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    };



    render() {
        const {item, testData} = this.props;
        console.log("展示组件内容:" + item.title);
        return(
            <View>
                <View style={styles.container} >
                    <Text>
                        {item.title} + Hot显示页面
                    </Text>
                    <Text>why</Text>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
      // flex:1,
      alignItems:'center'
    },
})
export default PlazaItemRow;
