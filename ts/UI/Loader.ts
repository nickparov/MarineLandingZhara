const Loader = (function() {

  // Private
  let loading: boolean = true;
  const loaderWrapperSelector: string = '#loader_wrapper';
  const loaderTimeout: number = 800;

  function showLoader(): void {
      $(loaderWrapperSelector).fadeIn(loaderTimeout);
  }

  function hideLoader(): void {
      $(loaderWrapperSelector).fadeOut(loaderTimeout);
  }
  // Public
  function simulateReloading(callback: () => void, callbackObject?: object) {
      showLoader();

      setTimeout(function() {
          if (typeof callback === 'function' 
              && typeof callbackObject !== undefined) {
                // Get all arguments in an array
                const argsArr: any = Array.prototype.slice.call(arguments, 2);
                // Execute function with the given array of arguments
                callback.apply(callbackObject, argsArr);
          } else if (typeof callback === 'function' 
                  && typeof callbackObject !== undefined) {
              callback.call(callbackObject);
          }

          hideLoader();
      }, loaderTimeout);
  }

  function toggleReload(): void {
      const isPageLoading: boolean = getPageLoadingStatus();
      if (isPageLoading === true) {
          hideLoader();
      } else {
          showLoader();
      }
      // flip the page loading status
      setPageLoadingStatus(!isPageLoading);
  }

  function getPageLoadingStatus(): boolean {
      return loading;
  }

  function setPageLoadingStatus(status: boolean): void {
      loading = status;
  }

  function getLoaderTime(): number {
    return loaderTimeout;
  }
  // Interface
  return {
      getPageLoadingStatus,
      setPageLoadingStatus,
      toggleReload,
      simulateReloading,
      showLoader,
      hideLoader,
      getLoaderTime
  }

})();

export default Loader;