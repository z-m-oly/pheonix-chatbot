/**
 * Generates a sting for id
 *
 * @returns {string}
 */
function GenerateID() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default GenerateID;
