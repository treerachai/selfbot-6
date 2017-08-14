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

  static cleanContent(msg, input) {
    return input
      .replace(/@(everyone|here)/g, '@\u200b$1')
      .replace(/<@!?[0-9]+>/g, input => {
        const id = input.replace(/<|!|>|@/g, '');
        if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
          return msg.client.users.has(id) ? `@${msg.client.users.get(id).username}` : input;
        }
        const member = msg.channel.guild.members.get(id);
        if (member) {
          if (member.nickname) {
            return `@${member.nickname}`;
          }
          return `@${member.user.username}`;
        }
        const user = msg.client.users.get(id);
        if (user) {
          return `@${user.username}`;
        }
        return input;

      })
      .replace(/<#[0-9]+>/g, input => {
        const channel = msg.client.channels.get(input.replace(/<|#|>/g, ''));
        if (channel) {
          return `#${channel.name}`;
        }
        return input;
      })
      .replace(/<@&[0-9]+>/g, input => {
        if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
          return input;
        }
        const role = msg.guild.roles.get(input.replace(/<|@|>|&/g, ''));
        if (role) {
          return `@${role.name}`;
        }
        return input;
      });
  }

  static inLineList(stringArray) {
    let str = '';
    for (let i = 0; i < stringArray.length; i++) {
      str += '`' + stringArray[i] + '`, ';
    }
    str = str.substring(0, str.length - 2);
    return str;
  }

  static commaList(stringArray) {
    let str = '';
    for (let i = 0; i < stringArray.length; i++) {
      str += stringArray[i] + ', ';
    }
    str = str.substring(0, str.length - 2);
    return str;
  }

}

module.exports = StringUtil;
