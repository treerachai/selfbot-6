class NumberUtil {
  static msToTime(input) {
    return {
      milliseconds: parseInt((input % 1000) / 100),
      seconds: parseInt((input / 1000) % 60),
      minutes: parseInt((input / (1000 * 60)) % 60),
      hours: parseInt(input / (1000 * 60 * 60)),
    };
  }
}
module.exports = NumberUtil;