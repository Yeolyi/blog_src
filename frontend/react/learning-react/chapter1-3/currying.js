async function getFakeMembers(count) {
  let res = await fetch(`https://api.randomuser.me/?nat=US&results=${count}`);
  let { results } = await res.json();
  return results;
}

const userLogs = (userName) => (message) => console.log(`${userName} -> ${message}`);
const log = userLogs('grandpa23');
log('attempted to load 20 fake members');

getFakeMembers(10).then((members) => log(`successfully loaded ${members.length} members`));
