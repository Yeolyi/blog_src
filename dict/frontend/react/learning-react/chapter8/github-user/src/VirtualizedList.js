import { faker } from '@faker-js/faker';
import List from './List';
import { FixedSizeList } from 'react-window'

const bigList = [...Array(5000)].map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
}))

// 429 TOO MANY REQUESTS
export function NormalList() {
    const renderItem = item => (
        <div style={{ display: "flex" }}>
            <img src={item.avatar} alt={item.name} width={50} />
            <p>{item.name} - {item.email}</p>
        </div>
    );
    return <List data={bigList} renderItem={renderItem} />;
}

export function BetterList() {
    const renderRow = ({ index, style }) => (
        <div style={{ ...style, ...{ display: "flex" } }}>
            <img
                src={bigList[index].avatar}
                alt={bigList[index].name}
                width={50}
            />
            <p>{bigList[index].name} - {bigList[index].email}</p>
        </div>
    );

    // renderRow -> render props pattern
    return (
        <FixedSizeList
            height={window.innerHeight}
            width={window.innerWidth - 20}
            itemCount={bigList.length}
            itemSize={50}
        >
            {renderRow}
        </FixedSizeList>
    );
}