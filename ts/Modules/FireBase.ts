import axios from '../../node_modules/axios/index';
import Modal from '../Modal';
import Loader from '../Loader';
import { Alert } from '../Components/export';

export const FireBase = (function() {

  const LoaderTimeout = Loader.getLoaderTime();
  const FN_LINKS = {
    sendRequest: "https://us-central1-seamanzhara.cloudfunctions.net/sendRequest",
    getAiportsAndCities: "https://us-central1-seamanzhara.cloudfunctions.net/getAiportsAndCities"
  }

  function SendRequest(req_email: string, req_body: string): void {
    const link = FN_LINKS.sendRequest.concat(`?req_email=${req_email}&req_body=${req_body}`),
          alertSuccessText = "Thanks for your request! <br/> We will reach out to you as soon as possible!",
          alertErrorText = "Some error occured n our end! <br/> Contact <a href='mailto:nickparov@gmail.com'> us </a>";

    axios.get(link)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          Modal.populateModal("Request Confirmation!", new Alert("success", alertSuccessText).render(), ``);
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

  function GetAirportsAndCities(keyword: string): void {
    const link = FN_LINKS.getAiportsAndCities.concat(`?keyword=${keyword}`),
          alertSuccessText = "Thanks for your request! <br/> We will reach out to you as soon as possible!",
          alertErrorText = "Some error occured n our end! <br/> Contact <a href='mailto:nickparov@gmail.com'> us </a>";
    
    console.log(keyword);

    // axios.get(link)
    //   .then(res => {
    //     console.log(res);
    //     setTimeout(() => {
    //       Modal.populateModal("Request Confirmation!", new Alert("success", alertSuccessText).render(), ``);
    //       Loader.hideLoader();
    //     }, LoaderTimeout);
    //   }).catch(err => {
    //     console.log(err)
    //     setTimeout(() => {
    //       Loader.hideLoader();
    //       Modal.populateModal("Request Error!", new Alert("warning", alertErrorText).render(), ``);
    //     }, LoaderTimeout);
    //   });
  }

  return {
    SendRequest,
    GetAirportsAndCities
  }
  
})();


export default FireBase;