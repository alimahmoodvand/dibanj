import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        flexDirection: 'row',
        marginBottom:10,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        width:'100%'
    },
    content: {
        flex:0.93,
        backgroundColor: 'white',
        overflow:'hidden',
        flexDirection:'row-reverse',
        borderRadius:5,
    },
    buy: {
        position:'absolute',
        top:'10%',
        left:0,
        backgroundColor: '$mainColor',
        height: '$productBntRaduis',
        width: '$productBnt',
        borderBottomRightRadius: '$productBntRaduis',
        borderTopRightRadius: '$productBntRaduis',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
        zIndex:100,
    },
    proBtnText:{
        color:'black',
        fontSize:15,
        textAlign:'center'
    },
    sample: {
        position:'absolute',
        top:'10%',
        right:0,
        backgroundColor: '$mainColor',
        height: '$productBntRaduis',
        width: '$productBnt',
        borderBottomLeftRadius: '$productBntRaduis',
        borderTopLeftRadius: '$productBntRaduis',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
    },
    image:{
        width:'$productImage',
        height:'$productImage',
        overflow:'hidden',
        borderBottomRightRadius:2,
        borderTopRightRadius:2,
    },
    details:{
        paddingRight:10,
        paddingTop:15,
        flex:0.5,
        alignItems:'flex-end',
        justifyContent:'flex-start',
        flexWrap:'wrap',
    },
    prices:{
        paddingLeft:10,
        paddingTop:5,
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',

    },
    detalsText:{
        color:'black',
        fontSize:18,
        margin:2,
        flexWrap:'wrap',
    },
    basket:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        borderColor:'$mainColor',
        borderWidth:1,
        backgroundColor:'$mainColor',
    },
    filterImage:{
        width:25,
        height:25
    },
    practiceContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 15,
        paddingRight:30,
    },
    practiceTitle: {
        padding: 15,
        alignItems: 'flex-end',
    },
    practiceTitleText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    practiceDescContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
         paddingBottom:10,
    },
    practiceDesc:{
        marginRight:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    practiceDescText: {
        color: '$grayColor'
    },
    circleYellow: {
        marginRight:'$productBnt/1.5',
        width: '$productBnt/1.5',
        height: '$productBnt/1.5',
        borderRadius: '$productBnt/1.5',
        backgroundColor: '$mainColor',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        color: 'black',
        // backgroundColor:'red',
        paddingRight:'$productBnt/12',
        paddingBottom:'$productBnt/12',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: "center",
        // textAlign: 'center',
        // textAlignVertical: 'center',
    },
});
