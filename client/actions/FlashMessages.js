/**
 * addFlashMessage - description
 *
 * @param  {type} message description
 * @return {type}         description
 */
export function addFlashMessage(message) {
  return {
    type: 'ADD_FLASH_MESSAGE',
    message
  };
}


/**
 * deleteFlashMessage - description
 *
 * @param  {type} id description
 * @return {type}    description
 */
export function deleteFlashMessage(id) {
  return {
    type: 'DELETE_FLASH_MESSAGE',
    id
  };
}
