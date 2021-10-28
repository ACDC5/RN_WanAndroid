import React, {PureComponent} from 'react';
import {View,
    StyleSheet,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar} from 'react-native';
// 直接指定至action目录也可，系统会自己定向导index文件
import {cst_PullPlaza} from '../../actions/index';
import {connect} from 'react-redux';
import plaza from "../../reducers/plaza";
import PlazaItemRow from "../../component/PlazaItemRow";

const Item = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}

class Test_Hot extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onlyValue:'initial Value'
        }
        this.getPlaza = this.getPlaza.bind(this);
        // this.renderEach = this.renderEach.bind(this)
    }

    async getPlaza() {
        await Promise.all(cst_PullPlaza());
    }

    // 组件挂载后，最终触发redux框架的action动作，
    // 由此更新了相应Component的的数据以及页面
    async componentDidMount() {
        // 第一次运行程序先执行render函数，然后运行当前componentDidMount函数(此生命周期函数只运行一次)，
         // 然后再执行render函数(因为从服务器获取数据导致状态更新了)
        console.log('组件挂载后')
        await this.getPlaza();
    }

    //TODO 为什么参数要用{}包裹? 经过测试,没有大括号PlazaItemRow组件获取item.xxx的值是undefined
    renderEach({item, index}) {
        return (
            <PlazaItemRow
                item={item}
                testData={123}
            />
        );
    }

    //TODO 写出一个导航页，并整合导App中

    renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    render() {
        //     // console.log(this.getPlaza())
        const {page,plazaData} = this.props;
        //     console.log('Hot_Test-store中的数据源: ' + plazaData.length);
        //
        //     // 跟印象中的不一样，数组类型返回的typeof结果不是arr，而是object
        //
        //     // 记住 typeof 操作符的唯一目的就是检查基础数据类型，如果我们希望检查
        //     // 任何从 Object 派生(如这里的plazaData数组)出来的结构类型，
        //     // 使用 typeof 是不起作用的，
        //     // 因为总是会得到 "object"。检查 Object 种类的合适方式是
        //     // 使用 instanceof 关键字。但即使这样也存在误差。
        //     // console.log('arr数据类型 '+ typeof plazaData);
        //
        plazaData.forEach(item => {
            console.log("每次循环的值： " + item.title)
        });

        return (
            <SafeAreaView>
                <FlatList
                    data={plazaData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//         backgroundColor: '#f9c2ff',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//     },
//     title: {
//         fontSize: 32,
//     },
// });

const mapStateToProps = state => {
    return{
        // TODO plaza应该是紫色
        plazaData:state.plaza.plazaData,
        page:state.plaza.page,
        themeColor: state.user.themeColor,
    };
};

export default connect(mapStateToProps)(Test_Hot);
