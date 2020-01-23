import './style.scss'
import {$} from './index'
export default () => {
   const myLoader = () => {
       let $body = $("body");
        $body.addClass("loading");

   };
   setInterval(myLoader, 1200)

    const removeLoader = () => {
       let $body = $("body");
    $body.removeClass("loading");
   clearInterval(myLoader)
   }
removeLoader()

}




