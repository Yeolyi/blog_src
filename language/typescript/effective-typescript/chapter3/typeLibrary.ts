import _ from 'lodash';

const csvData = '...';
const rawRows = csvData.split('\n');
const headers = rawRows[0].split(',');

const rows = rawRows.slice(1).map((rowStr) => {
  const row = {};
  rowStr.split(',').forEach((val, j) => {
    row[headers[j]] = val;
    // ~No index signature with a parameter of type 'string' was found on type '{}'
  });
  return row;
});

const rows2 = rawRows.slice(1).map((rowStr) => _.zipObject(headers, rowStr.split(',')));

// @ts-ignore
const bestPaid = _(allPlayers)
  .groupBy((player) => player.team)
  .mapValues((players) => _.maxBy(players, (p) => p.salary)!)
  .values()
  .sortBy((p) => -p.salary)
  .value(); // Type is BasketballPlayer[]

// chain을 통해 _.a(_.b(v))가 아닌 _(v).a().b()처럼 사용할 수 있다.
