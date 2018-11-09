import ExStyleSheet from "react-native-extended-stylesheet";

export default styles = ExStyleSheet.create({
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
        // backgroundColor: '#fff',
        // marginRight:15,
        // marginTop:15,
        // marginLeft:15,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        // paddingRight:10,
        // paddingLeft:10,
    },
    searchSection: {
        flexDirection: 'row',
        marginLeft:10,
        marginRight:10,
        borderBottomWidth:2,
        borderBottomColor:'black',

    },
    searchIcon: {
        flex: 0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    input: {
        flex: 0.7,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        textAlign:'right',
        color: '#424242',
    },
    filterSection:{
        marginTop:5,

    },
    filterHeader:{
        // backgroundColor:'#f1f1f1',
        width:'100%',
        textAlign:'right',
        padding:5,
    },
    filterOptions:{
        // paddingRight: 10,
        // paddingBottom: 10,
        flexWrap:'wrap',
        marginBottom:10,
    },
    filterOption:{
        // paddingTop:10,
        // paddingBottom:10,
        // flexWrap:'wrap',
        // borderColor:'black',
        // borderWidth:5,
        // flexDirection:'row',
        // paddingRight:0,
        // paddingLeft:0,
        // width:'20%',
        // fontSize:10,
        // flex:1,
        // backgroundColor:'red'
    },
    serachBtnSection:{
        flex:0.2,
        // flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnSearch:{

        backgroundColor:'rgb(255, 200, 0)',
        // paddingLeft:30,
        // paddingRight:30,
        // marginBottom:5,
        // flex:0,
        // marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
        paddingLeft:10,
        paddingBottom:5,
        paddingTop:5,
    },
    btnSearchText:{
        color:'black',
        fontSize:14,
    },
    accordianContent:{
        // flexDirection:'row',
        // width:'100%',
        backgroundColor:'white',
        flex:1,
    },
    subCatsBtn:{
      backgroundColor:'transparent',
        borderWidth:0,
        // borderRadius:0,
        borderColor:'transparent',
        width:'100%' ,
        justifyContent:'flex-end',
        paddingRight:10,
    },
    subCatsBtnSelected:{
        backgroundColor:'$mainColor'
    },
    accordianHeader:{
        flexDirection:'row',
        padding:5,
        // borderBottomColor:'black',
        // borderBottomWidth:1,
    },
    accordianHeaderContainerText:{
        alignContent:'center',
        justifyContent:'center',
        flex:1,

    },
    accordianHeaderText:{
        textAlign:'right',
        fontSize:20,
    },
    categories:{
        backgroundColor:'#f1f1f1',
        // margin:10,
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
    serachOptions:{
        flexDirection:'row-reverse',
        marginTop:5,
        flexWrap:'wrap',
    },
    serachOption:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'$grayColor',
        padding:10,
        margin:5,
        // paddingLeft:20,
        // paddingRight:20,
    },
    serachOptionText:{
        color:'white',
        fontSize:18,

    },
    categoryToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
    },
    modal: {

        justifyContent: "flex-end",
        margin: 0
    },
    categorySection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    categoryHeader:{
        // flex:0.5,
    },
    categoryBtn:{
        backgroundColor:'$mainColor',
        padding:5,
    },
    categoryBtnContainer:{
        flex:0.5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
    },
    products:{
        flex:.95,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        // alignItems:'center',
        borderRadius:5,
        overflow:'hidden'
    }
});
