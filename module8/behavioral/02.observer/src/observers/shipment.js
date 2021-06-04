export default class Shipment {
  update({id, userName}) {
    console.log(`[${id}]: [shipment] will pack to the user's order to ${userName}`);
  }
}