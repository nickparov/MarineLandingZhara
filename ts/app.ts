import Chat from "./Controllers/Chat";
import Modal from "./UI/Modal";
import Loader from "./UI/Loader";
import Events from './Controllers/Events';
import Cities from "./Modules/Cities";

var DatePicker = require('@chenfengyuan/datepicker');


const App = (function () {

  function start(): void {
    
    // setup events
    Events.Setup();
    // hide loader
    Loader.hideLoader();
    // init cities
    Cities.init();
    
  }

  return {
    start
  }
})()



jQuery(document).ready(() => App.start());
