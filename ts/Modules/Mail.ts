import axios from '../../node_modules/axios/index';
import Modal from '../Modal';
import Loader from '../Loader';
import * as Components from '../Components/Components';

export const Mail = (function() {
  const FirebaseFunctions = {
    sendRequest: "https://us-central1-seamanzhara.cloudfunctions.net/sendRequest"
  }

  function SendRequest(req_email: string, req_body: string): void {
    const link = FirebaseFunctions.sendRequest.concat(`?req_email=${req_email}&req_body=${req_body}`),
          alertSuccessText = "Thanks for your request! <br/> We will reach out to you as soon as possible!";

    axios.get(link)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          Loader.hideLoader();
          Modal.populateModal("Request Confirmation!", Components.Alert("success", alertSuccessText), ``);
        }, 1300);
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          Loader.hideLoader();
          Modal.populateModal("Request Error!", "Some error occured on our end!", ``);
        }, 1300);
      });
  }

  return {
    SendRequest
  }
  
})();


export default Mail;