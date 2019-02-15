import React, { Component } from 'react';
import HeaderLayout from "../../components/header/header";
import {Button, Container} from "native-base";
import {FlatList, Image, ImageBackground, Text, TouchableOpacity, View, WebView} from "react-native";
import styles from './termproduct.css'
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import {addBasket, removeBookmark, saveProducts} from "../../redux/actions";

//import HTML from 'react-native-render-html';
import Modal from "react-native-modal";
import Http from "../../services/http";
import AlertMessage from "../../services/alertmessage";


class TermProduct extends Component{
    _getNotExistImage(prod){
        return(
            <Image style={styles.image} source={require('./../../assets/images/bg.jpg')}/>
        );
    }
    _getPrices=(prod)=>{
        let decStyle={color:'black',textAlign:'right'};
        if(prod.DiscountPercent!=0||prod.PriceAfterDiscount!=0){
            // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
            decStyle={textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'red', textDecorationColor: 'red'};
            if(prod.DiscountPercent==0&&prod.PriceAfterDiscount!=0){
                prod.PriceAfterDiscount=parseInt((prod.DiscountPercent/prod.price)*100);
            }
            else if(prod.DiscountPercent!=0&&prod.PriceAfterDiscount==0){
                prod.DiscountPercent=prod.price*parseInt(prod.PriceAfterDiscount/100)
            }
        }
        // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
        if(prod.PriceAfterDiscount==prod.price||(prod.PriceAfterDiscount==0&&prod.DiscountPercent==0)){
            prod.PriceAfterDiscount=0;
            decStyle={color:'black'}
        }
        // console.log(prod,decStyle,prod.PriceAfterDiscount,prod.price,prod.DiscountPercent)
        // decStyle.backgroundColor='red';
        let sectionStyle={};

        if( prod.price===0){
            sectionStyle={
            width:0,
                height:0
            }
            this.infoSideStyle={flex:0.9}
        }
        return(
            <View style={[styles.priceSide,sectionStyle]}>
            <View style={styles.prices}>
                { prod.price>0&&
                    <Text style={[decStyle,{fontSize:11,fontWeight:'normal'}]}>
                        {this._priceSeparate(prod.price)}
                    </Text>
                }
                {prod.DiscountPercent > 0 &&
                    <Text style={[{fontSize:11,fontWeight:'normal'}]}>{prod.DiscountPercent+'%'+' تخفیف'}</Text>
                }
                {prod.PriceAfterDiscount > 0&&
                <Text style={[{color:'green'},{fontSize:11,fontWeight:'normal'}]}>{this._priceSeparate(prod.PriceAfterDiscount)}</Text>
                }
            </View>
            </View>
        );
    }
    infoSideStyle={}
    _priceSeparate=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");

    };
    _findBasket=()=>{
        for(let i=0;i<this.props.basket.basket.length;i++){
            if(this.props.prod.ProductAndCourseId==this.props.basket.basket[i].ProductAndCourseId){
                return true;
            }
        }
        return false;
    }
    _findProduct=()=>{
        let child=[];
        if(this.props.isChild) {
            for (let i = 0; i < this.props.products.length; i++) {
                if (this.props.prod.ProductAndCourseId === this.props.products[i].ParentId) {
                    child.push(this.props.products[i])
                }
            }
        }
        return child;
    }
    state={
        visibleChild:false
    }
    componentWillMount() {

    }
    _renderImages=(prod)=> {
        let images=[]



        if((prod.remainCount===0||prod.remainCount<-1)||new Date(prod.EndDate).getTime()<new Date().getTime()){
            images.push(<Image style={styles.imageStickerDate} key={0} source={require('../../assets/images/finish.png')}/>);
        }
        else if(new Date(prod.StartDate).getTime()>new Date().getTime()){
            images.push(<Image style={styles.imageStickerDate} key={3}  source={require('../../assets/images/registering.png')}/>);
        }
        else if(new Date(prod.StartDate).getTime()<new Date().getTime()&&new Date(prod.EndDate).getTime()>new Date().getTime()){
            images.push(<Image style={styles.imageStickerDate} key={4}  source={require('../../assets/images/progress.png')}/>);
        }
        let marginFree={}
        if(prod.PriceAfterDiscount===0){
            images.push(<Image style={styles.imageStickerFree} key={1} source={require('../../assets/images/free.png')}/>);
        }else{
            marginFree={marginLeft:'20%'}
            //images.push(<Image style={[styles.imageStickerFree,{height:0}]} key={1} source={require('../../assets/images/free.png')}/>);

        }
        if(prod.isSpecial===1){
            images.push(<Image style={[styles.imageStickerFree,marginFree]} key={2} source={require('../../assets/images/home/special.png')}/>);
        }
        return images.map((item,index)=>{
            return  item;
        })
    }
    _goToEAP=async(prod,EAPtype)=>{
        let response = await Http._postAsyncData({
            userId: this.props.user.userId,
            ProductAndCourseId:prod.ProductAndCourseId,
            type: EAPtype,
            token: this.props.user.token
        }, 'userCourseAndPractice');
       // console.log(response)
        if (Array.isArray(response)&&response.length===1&&response[0].status===0) {
            Actions.practice({ProductAndCourseId:prod.ProductAndCourseId,EAPtype})
        }else{
            let status='';
            if(response[0].status==1){
                status='در حال بررسی'
            }else if(response[0].status==2){
                status='قبول'
            }else if(response[0].status==-2){
                status='مردود'
            }
            if(status){
                let typeText=``;
                if (EAPtype===1)
                    typeText=(' آزمون ')
                else
                    typeText=(' تمرین ')
                let msg=`وضعیت آخرین ${typeText+status} است `;
                new AlertMessage().error(null,msg)
            }
        }
    }
    render(){
        const {prod,category,search,isChild}=this.props
        let child=this._findProduct();
        let maxlimit=50;
        let regex = /(<([^>]+)>)/ig
        if(prod.Description){
            prod.Description=prod.Description.replace(regex,'').replace(/(\&.*\;)/gi, '').replace(/^\s*$(?:\r\n?|\n)/gm,'')
        }
        prod.Description=(prod.Description&&((prod.Description).length > maxlimit) ?
            (((prod.Description).substring(0,maxlimit-3)) + '...') :
            prod.Description );
        let duration=false;
        if(prod.Duration&&prod.Duration.trim()!==''){
            duration=true;
        }
        let overlay=<Image style={styles.image} source={{uri: prod.thumbnailUrl}}/>;

        return(
            <View style={styles.main}>
                <View style={styles.content}>
                    <View style={styles.container}>
                        <View style={styles.practiceSection}>
                            <TouchableOpacity style={styles.practiceBtn} onPress={()=>this._goToEAP(prod,1)}>
                                <Text style={[{color:'black'}]} >آزمون</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.practiceBtn} onPress={()=>this._goToEAP(prod,2)}>
                                <Text style={[{color:'black'}]} >تمرین</Text>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.details}>
                        <View style={[styles.infoSide,this.infoSideStyle]}>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{fontWeight:'bold'}]}>{prod.Title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.user({userId:prod.MasterId,category,search})}>
                            <Text style={[styles.detalsText,{color:'blue'}]} >{prod.fullName}</Text>
                        </TouchableOpacity>
                        {duration&&
                        <TouchableOpacity style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={styles.detalsText}>{'مدت دوره:'+prod.Duration}</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity  style={styles.btns} onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                        <Text style={[styles.detalsText,{textAlign:'right',fontSize:10,color:'black'}]}>{(prod.persianRegisterDeadLine&&prod.persianRegisterDeadLine!=="1"?prod.persianRegisterDeadLine.split(' ')[0].replace(/-/gi,'/'):'')}</Text>
                        </TouchableOpacity>
                        </View>

                    </View>
                        <TouchableOpacity style={styles.image}  onPress={()=>Actions.course({id:prod.ProductAndCourseId,category,search})}>
                            <ImageBackground style={styles.image} source={{uri: prod.thumbnailUrl}}>{overlay}</ImageBackground>
                        </TouchableOpacity>
                    </View>
                    {(isChild &&this.state.visibleChild)&&
                    <View style={styles.expandableList}>
                        <FlatList style={{flex: 1}}
                                  data={child}
                                  extraData={this.state}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item, index}) => {
                                      return this._renderChild(item, index);
                                  }}
                        />
                    </View>
                    }
                    {isChild &&
                    < View style={styles.expandable}>
                        <MIcon name={this.state.visibleChild?"expand-less":"expand-more"} style={styles.expandableIcon} onPress={() => {
                            this.setState({visibleChild:!this.state.visibleChild})
                        }} color="black" size={20}/>
                    </View>
                    }
                </View>
                <Button style={styles.sample} title={prod.id} onPress={() => {
                    Actions.course({id:prod.ProductAndCourseId,category,search})
                }}>
                    <Text style={styles.proBtnText}>مشاهده</Text>
                </Button>
            </View>
        );
    }
    _renderChild=(item,index)=>{
        return(<TermProduct prod={item} />);
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        addBasket:(product)=>{
            dispatch(addBasket(product));
        },
        removeBookmark:(product)=>{
            dispatch(removeBookmark(product));
        },
    }
}
const mapStateToProps=state=>{
    return{
        user:state.user,
        products:state.products.products,
        basket:state.basket
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TermProduct);