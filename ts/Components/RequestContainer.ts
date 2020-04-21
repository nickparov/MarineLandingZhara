export const RequestContainer = function(p_message: string): string { 
  let wasfocused = false;
  // set handler
  $(document).on({
      focusin: function() {
        if(!wasfocused) {
          $(this).val("")
          wasfocused = true;
        } 
      }
  }, "#RequestMessage");
    
  return `
  <div class="row">
    <div class="col-lg-4">
        <p class="alert alert-info">${p_message}</p>
    </div>
    <div class="col-lg-8">
        <textarea name="message" rows=3 id="RequestMessage" class="form-control">Additional Info</textarea> 
    </div>
  </div>
  `;
}
