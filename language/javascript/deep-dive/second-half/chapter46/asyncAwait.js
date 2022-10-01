// await는 반드시 async 함수 내부에서 사용해야한다.
// async 함수는 반드시 프로미스를 반환한다. 반환값이 없으면 암시적으로라도 반환한다.
// await 키워드는 반드시 프로미스 앞에서 사용해야 한다.

const getGithubUserName = async (id) => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name);
};

getGithubUserName("yeolyi");

const foo = async () => {
  try {
    const wrongUrl = "https://wrong.url";
    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e); // TypeError: Fetch failed.
  }
};

foo();

// async 함수 내에서 catch 문을 사용해 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다.
