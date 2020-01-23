import './style.scss'
import {$} from './index'
export default () => {


   const myLoader = () => {
       let $body = $("body");
        $body.removeClass("loading");

   };

   const removeLoader = () => {
       let $body = $("body");
    $body.toggleClass("loading");
   clearInterval(myLoader)
   };

   setTimeout(myLoader, 1200);
    removeLoader();

}




