const { expect } = require('chai');
const axios = require('axios');
const { response } = require('express');

describe('Mocha', function () {
    it('should work because its a sanity test', function () {
      expect(1).to.be.ok;
    })
})

describe('User Insert', function (){
  let userRecord = { 
  };
  let expectedName ;
  let expectedEmail ;
  let expectedPassword ;
  let expectedStatusCode = 400;
  let actualStatusCode ;


  it('should return a 201 response status code using async/await', async function () {
    userRecord.name = "Ken Robinson";
    userRecord.email = "ken@there.com";
    userRecord.password = "KenRobinson";
    const res = await axios.post('http://localhost:5000/api/users', userRecord)
    const actual = res.status;
    const expected = 201;

    expect(actual).to.equal(expected);
  });

  it('should return a 201 response status code using the older done method', function (done ) {
    userRecord.name = "Ken Robinson";
    userRecord.email = "ken@there.com";
    userRecord.password = "KenRobinson";
    
    const res = axios.post('http://localhost:5000/api/users', userRecord)
    .then((res) => {
      const actual = res.status;
      const expected = 201;
  
      expect(actual).to.equal(expected);
          done();
    })
    .catch(err => done(err))
  });

  it('should return a 201 response status code using the before hook', async function() {
    let responseObj;
    responseObj = await axios.post('http://localhost:5000/api/users', userRecord);
    
    let actual = responseObj.status;
    let expected = 201;
    
    expect(responseObj.status).to.equal(expected);
  });

});

