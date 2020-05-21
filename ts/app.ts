import Chat from "./Controllers/Chat";
import Modal from "./UI/Modal";
import Loader from "./UI/Loader";
import Events from './Controllers/Events';
import Cities from "./Modules/Cities";

var DatePicker = require('@chenfengyuan/datepicker');


const App = (function () {

  function start(): void {
    Cities.init();
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
