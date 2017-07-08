class StringUtil {
  static isNullOrWhiteSpace(input) {
    return !input || input.replace(/\s/g, '').length === 0;
  }
}

module.exports = StringUtil;
