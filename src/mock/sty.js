console.log("hello world hah");

import Mock from 'mockjs'

let useMock = true;

if (useMock) {
    Mock.mock("/api/getStyData", {"test": "test result"})
}

export default Mock