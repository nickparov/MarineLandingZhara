import Chat from "./Chat";
import Modal from "./Modal";
import Loader from "./Loader";
import Events from './Events';

var DatePicker = require('@chenfengyuan/datepicker');


const App = (function () {

  function start(): void {
    // if event were succesfully setup
    if(!Events.Setup()) {

      // show error page!!!
    }
    // hide loader
    setTimeout(() => {
      Loader.hideLoader();
    }, 0);
    
  }

  return {
    start
  }
})()



jQuery(document).ready(() => App.start());
