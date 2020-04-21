export { RequestContainer } from './RequestContainer';

export { Alert };

const AlertTypes = {
  success: "success",
  info: "info",
  warning: "warning",
  danger: "danger"
}

function Alert(type: string, text: string) {
  if(AlertTypes.hasOwnProperty(type)) {
    return `
    <div class="alert alert-${ type }" role="alert">
      ${ text }
    </div>
    `;
  } else {
    return `<b>Error in Alert Component!</b>`;
  }
}