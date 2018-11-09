import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    container: {
        flex:1,
    },
    steps:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        flexDirection:'row',
    },
    circleYellow:{
        width:'$productBnt',
        height:'$productBnt',
        borderRadius:'$productBnt',
        backgroundColor:'$mainColor',
        alignItems:'center',
        justifyContent:'center'
    },
    circleGray:{
        width:'$productBnt',
        height:'$productBnt',
        borderRadius:'$productBnt',
        backgroundColor:'#747474',
        alignItems:'center',
        justifyContent:'center'
    },
    circleText:{
        color:'black',
        textAlign:'center',
    },
    lineYellow:{
        height:'$productBnt/2',
        width:2,
        backgroundColor:'$mainColor',
    },
    lineGray:{
        height:'$productBnt/2',
        width:2,
        backgroundColor:'$grayColor',
    },
    title:{
        alignItems:'flex-end',
        justifyContent:'flex-start',
        flex:0.4,
        height:'$productBnt',
        paddingTop:'$productBnt/4',
        // borderColor:'black',
        // borderWidth:1
    },
    circles:{
        alignItems:'center',
        justifyContent:'center',
        flex:0.2,
    },
    train:{
        alignItems:'center',
        justifyContent:'flex-start',
        flex:0.4,
        height:'$productBnt',
        paddingTop:'$productBnt/4' ,
        // borderColor:'black',
        // borderWidth:1
    },
});