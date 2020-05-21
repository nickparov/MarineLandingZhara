import axios from '../../node_modules/axios/index';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';
import { Alert } from '../UI/HTMLComponents/export';

export const FireBase = (function() {

  const LoaderTimeout = Loader.getLoaderTime();
  const FN_LINKS = {
    sendRequest: "https://us-central1-seamanzhara.cloudfunctions.net/sendRequest",
    sendPriceRequest: "https://us-central1-seamanzhara.cloudfunctions.net/sendPriceRequest"
  }

  function SendRequest(req_email: string, req_body: string): void {
    const link = FN_LINKS.sendRequest.concat(`?req_email=${req_email}&req_body=${req_body}`),
          alertSuccessText = "Thanks for your request! <br/> We will reach out to you as soon as possible!",
          alertErrorText = "Some error occured n our end! <br/> Contact <a href='mailto:nickparov@gmail.com'> us </a>";

    axios.get(link)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          if(res.data.data.success === true){ 
            Modal.populateModal("Request Confirmation!", new Alert("success", alertSuccessText).render(), ``);
          } else {
            Modal.populateModal("Request Error!", alertErrorText, ``);
          }
          Loader.hideLoader();
        }, LoaderTimeout);
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          Loader.hideLoader();
          Modal.populateModal("Request Error!", alertErrorText, ``);
        }, LoaderTimeout);
      });
  }

  function SendPriceRequest(data: object): void {
    const link = FN_LINKS.sendPriceRequest,
          alertSuccessText = "Thanks for your request! <br/> We will reach out to you as soon as possible!",
          alertErrorText = "Some error occured n our end! <br/> Contact <a href='mailto:nickparov@gmail.com'> us </a>";

    axios.post(link, data)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          if(res.data.data.success === true){ 
            Modal.populateModal("Request Confirmation!", new Alert("success", alertSuccessText).render(), ``);
          } else {
            Modal.populateModal("Request Error!", alertErrorText, ``);
          }
          Loader.hideLoader();
        }, LoaderTimeout);
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          Loader.hideLoader();
          Modal.populateModal("Request Error!", alertErrorText, ``);
        }, LoaderTimeout);
      });
  }

  return {
    SendRequest,
    SendPriceRequest
  }
  
})();


export default FireBase;