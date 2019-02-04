import {ToastAndroid} from "react-native";

export default class AlertMessage{
   messages={
        phoneInvalid:`شماره وارد شده نادرست است`,
        error:`مشکلی بوجود آمده است مجددا تلاش کنید`,
        serverError:`مشکلی در سرور بوجود آمده است مجددا تلاش کنید`,
        responseEmpty:`جوابی دریافت نشد`,
        notEqualPass:`رمز عبور با تکرار رمز عبور برابر نیست`,
        shortPass:`رمز عبور باید حداقل 8 حرف باشد`,
        shortVerify:`کد تایید باید عدد 5 رقمی باشد`,
        expireCode:`کد تایید منقضی شد`,
        emailInvalid:`ایمیل نادرست است`,
        shortUsername:`نام کاربری باید حداقل 3 حرف باشد`,
        notFound:`موردی یافت نشد`,
       isEmpty:'فیلد خالی است',
       empty:' خالی است',
       updateUser:'اطلاعات کاربر بروز شد',
       fillAll:'لطفا همه موارد را پر کنید',
       postalCode:'کد پستی را 10 رقمی وارد کنید',
       commentEmpty:'لطفا نظر خود را وارد کنید',
       offEmpty:'لطفا کد تخفیف خود را وارد کنید',
       addressEmpty:'لطفا یک آدرس انتخاب کنید',
       practiceEmpty:'تمرینی پیدا نشد',
       examEmpty:'آزمونی پیدا نشد',
       rateEmpty:'لطفا برای نظر دهی امتیاز را نیز مشخص کنید',
       commentDone:'با سپاس. ارسال پیام موفقیت آمیز بود و پس از تایید قرار داده خواهد شد',
       answerEmpty:'جواب های خالی را پر کنید',
       answerDone:'جواب های شما ثبت شد',
       passwordChange:'رمز عبور شما تغییر کرد',
       paymentError:'خطا در تراکنش بانکی دوباره تلاش کنید',
    };
    error=(index=null,more='',delay=ToastAndroid.LONG,position=ToastAndroid.BOTTOM)=> {
        let textMessage = ``;
        if (index && this.messages[index]) {
            textMessage += this.messages[index];
            if (more !== '')
                textMessage += '\r\n'
        }
        textMessage += more;
        console.log('AlertMessage', textMessage)
        ToastAndroid.showWithGravity(
            textMessage,
            delay, position
        );
    }
    message=(index=null,more='',delay=ToastAndroid.LONG,position=ToastAndroid.BOTTOM)=> {
        let textMessage = ``;
        if (index && this.messages[index]) {
            textMessage += this.messages[index];
            if (more !== '')
                textMessage += '\r\n'
        }
        textMessage += more;
        console.log('AlertMessage', textMessage)
        ToastAndroid.showWithGravity(
            textMessage,
            delay, position
        );
    }
}