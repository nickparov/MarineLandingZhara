const Modal = (function() {

  // Private methods and vars
  const ModalStatus = {
          isOpened: false
      },
      Selectors = {
          ModalContent: '#ModalContent',
          ModalContainer: '.modal_container',
          CloseModalBtn: '.closeModalBtn',
          ModalTitle: '#modalTitle',
          ModalBtns: "#ModalBtns"
      };

  function _setIsOpened(bool: boolean): void {
    ModalStatus.isOpened = bool;
  }

  function getModalStatus(): boolean {
    return ModalStatus.isOpened;
  }
  // Public
  function populateModal(title: string, contentHtml: string, btnsHtml: string): void {
      // Change Modal Title
      $(Selectors.ModalTitle).html(title);
      // populate ModalContent with html content
      $(Selectors.ModalContent).html(contentHtml);
      $(Selectors.ModalBtns).html(btnsHtml);
  }

  function clearModal(): void {
    $(Selectors.ModalTitle).html('');
    $(Selectors.ModalContent).html('');
    $(Selectors.ModalBtns).html('');
  }

  function hideAndClear(): void {
    $(Selectors.ModalContainer).fadeOut( 700, function() {
        // change modalOpened status
          _setIsOpened(false);
        // clear the modal
          clearModal();
    });
  }

  function _disableScrolling(): void {
    $("body").css({
      height: "100%",
      overflow: "hidden"
    });
  }

  function _enableScrolling(): void {
    $("body").css({
      height: "auto",
      overflow: "visible"
    });
  }

  function show(callback?: () => void ): void {
    _disableScrolling();

    $(Selectors.ModalContainer).fadeIn( 700, function() {
        // change modalOpened status
          _setIsOpened(true);
        // check for callback func
          if(typeof callback === 'function')
              callback();
    });
  }

  function hide(callback?: () => void): void {
    _enableScrolling();

    $(Selectors.ModalContainer).fadeOut( 700, function() {
        // change modalOpened status
            _setIsOpened(false);
        // check for callback func
            if(typeof callback === 'function')
                callback();
    });
  }

  function addAlert(alertType: string = 'warning', boldText: string = '', stillText: string = '') {
    const HTML: string = `
      <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        <strong>${boldText}</strong> ${stillText}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    $(Selectors.ModalContent).prepend(HTML);
  }

  function getSelectors(): object {
      return Selectors;
  }


  // Module self-initialization
  $(Selectors.ModalContainer).hide();
  // set up close btn event listener
  $('body').on('click', Selectors.CloseModalBtn, function() {
    hide(clearModal);
  });
  $(document).keyup(function(e) {
    if ((e.key === "Escape") && getModalStatus() === true) { // escape key maps to keycode `27`
      hide(clearModal);
    }
  })


  // Interface
  return {
      hide,
      show,
      clearModal,
      populateModal,
      getSelectors,
      hideAndClear,
      addAlert,
      getModalStatus
  }
})()

export default Modal;
