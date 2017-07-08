class StringUtil {
  static isNullOrWhiteSpace(input) {
    return (typeof input === 'undefined' || input == null) || input.replace(/\s/g, '').length === 0;
  }
}

module.exports = StringUtil;
