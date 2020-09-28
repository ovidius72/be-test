"use strict";

module.exports = async function (server) {
  // create a list of italian cities
  const cities = [
    { name: 'Roma', code: 3169070 },
    { name: 'Milano', code: 3173435 },
    { name: 'Firenze', code: 6542285 },
    { name: 'Napoli', code: 3172394 },
    { name: 'Torino', code: 3165523 },
    { name: 'Palermo', code: 2523918 },
  ];

  // NOTE: Importing requires a better strategy!!!.
  try {
    console.log("import data...");
    const models = server.models;
    const Customer = models.customer;
    const City = models.city;
    const User = models.user;
    const erpCustomers = await Customer.find();
    const addCityPromises = cities.map(c => new Promise((resolve, reject) => {
      City.findOrCreate({ where: { code: c.code }}, c, (err, newCity, created) => {
        if(err) {
          reject(err);
        } else {
          resolve({ city: newCity, created });
        }
      });
    }));
    const cityRes = await Promise.all(addCityPromises);
    console.log("cityRes", cityRes);
    // user's data needs to be generated in a different way. 
    const toUsers = erpCustomers.map((c) => ({
      username: c.id.toLowerCase(),
      email: `${c.id.toLowerCase()}@example.com`,
      password: c.id.toLowerCase(),
      emailVerified: true,
      erpId: c.id,
    }));
    const addPromises = toUsers.map(
      (u) =>
        new Promise(async (resolve, reject) => {
          try {
            User.findOrCreate(
              { where: { erpId: u.erpId } },
              u,
              (err, success, created) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ success, created });
                }
              }
            );
          } catch (e) {
            console.log("e", e);
            reject(e);
          }
        })
    );
    const res = await Promise.all(addPromises);
    console.log("res", res);
  } catch (e) {
    console.log("error importing..", e);
  }
};
