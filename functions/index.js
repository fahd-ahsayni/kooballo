export function generateOrderKey(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function calculatePrice(litres) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour < 20) {
    return 0.05 * litres;
  } else if (currentHour >= 20 && litres > 1000) {
    return 0.05 * litres + 15;
  } else {
    return 0.05 * litres + 30;
  }
}
