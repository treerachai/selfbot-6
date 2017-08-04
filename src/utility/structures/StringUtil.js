class StringUtil {
  static isNullOrWhiteSpace(input) {
    return !input || input.replace(/\s/g, '').length === 0;
  }

  static upperFirstChar(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  static boldify(input) {
    return '**' + input.replace(/\*|~|`/g, '').replace(/_/g, ' ') + '**';
  }

  static alphabeticallySort(a, b) {
    return a.name.localeCompare(b.name);
  }

  static formatUsers(users) {
    let formattedMembers = '';

    for (const user of users) {
      formattedMembers += user.tag + ', ';
    }

    return formattedMembers.slice(0, -2);
  }
  
}

module.exports = StringUtil;
