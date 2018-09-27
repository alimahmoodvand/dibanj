import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    main: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    content:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)'
    },
    filter:{
        flexDirection:'row',
        marginLeft:12,
        overflow:'visible',
    },
    filterIcon: {
        marginRight:15,
    },
    ddlistContainer:{
        position:'absolute',
        right:0,
        zIndex:100,
        top:2,
        backgroundColor:'white',
        overflow:'visible',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        // borderColor:'rgba(0,0,0,0.2)',
        // borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
        elevation:20,
    },
    ddlist:{
        backgroundColor:'white',
        padding:10,
        paddingLeft:25,
        paddingRight:25,
        borderTopColor:'rgba(0,0,0,0.2)',
        borderTopWidth:1,
        width:'100%',
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        elevation:0,
    },
    collapseContainer:{
        width:'120%',
        position:'relative',
        height:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    productsSection:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',

    },
    products:{
        flex:.95,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        overflow:'hidden'
    },
    filterExist:{
        flexDirection:'row',
        flex:0.95,
        alignContent:'flex-end',
        justifyContent:'flex-end',
        overflow:'visible',
    },
    accordianContent:{
        flexDirection:'row',
        width:'100%',
    },
    accordianHeader:{
        flexDirection:'row',
        flex:1,
        padding:10,
        borderBottomColor:'black',
        borderBottomWidth:1,

    },
    accordianHeaderContainerText:{
        alignContent:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    accordianHeaderText:{
        textAlign:'right',
        // fontSize:20,
    },
    categories:{
        backgroundColor:'white',
        margin:10,
        flex:1,
        borderRadius:5,
    },
    accordianSubContent:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:'100%',
    },
    accordianSubHeader:{
        flexDirection:'row',
        flex:1,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        borderBottomColor:'black',
        borderBottomWidth:1,

    },
    accordianSubHeaderContainerText:{
        alignContent:'center',
        justifyContent:'center',
        width:'95%',
    },
    accordianSubHeaderText:{
        textAlign:'right',
        fontSize:20,
        color:'black',
    },
    accordianSubContainer:{
        width:'100%',
        flexDirection:'row',
    },
    accordianSectionCircles:{
        flex:0.5,
        backgroundColor:'red',
        //height:20,
    },
    accordianSectionTrains:{
        flex:0.5,
        backgroundColor:'blue',
        height:20,

    },
    accordianSectionStepper:{
        flex:1,
    },
    train:{
        alignItems:'center',
        justifyContent:'center',
        // flex:0.4,
        // height:'$productBnt/4',
        // paddingTop:'$productBnt/4' ,
    },
});
