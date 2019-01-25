'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');

function formatDateForDatabase() {
  const date = new Date();
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

async function hashPassword(password) {
  const SALT_WORK_FACTOR = 10;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  return bcrypt.hash(password, salt);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const password = await hashPassword(process.env.ADMIN_PASSWORD);

    return [
      await queryInterface.bulkInsert('Constituencies', [{
        id: '39296307-52d0-456f-bd88-eb89dab2eea1',
        constituencyName: 'admin',
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
      await queryInterface.bulkInsert('SubCounties', [{
        id: '04f97aa5-1d9f-42ae-ab6b-77f8bc4a74c3 ',
        constituencyId: '39296307-52d0-456f-bd88-eb89dab2eea1',
        subCountyName: 'admin',
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
      await queryInterface.bulkInsert('Parishes', [{
        id: '757f4e65-e397-4819-945f-99aff2799c2a',
        subCountyId: '04f97aa5-1d9f-42ae-ab6b-77f8bc4a74c3',
        parishName: 'admin',
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
      await queryInterface.bulkInsert('Villages', [{
        id: 'cf016633-7868-424e-905d-0bff4afbae1a',
        parishId: '757f4e65-e397-4819-945f-99aff2799c2a',
        villageName: 'admin',
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
      await queryInterface.bulkInsert('Representatives', [{
        id: '36107f30-9381-4bdf-aad1-88acde24cd97',
        villageId: 'cf016633-7868-424e-905d-0bff4afbae1a',
        firstName: 'admin',
        lastName: 'admin',
        contact: '1234567890',
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
      await queryInterface.bulkInsert('Users', [{
        id: '78989115-3d00-4605-9a19-3e5627812212',
        representativeId: '36107f30-9381-4bdf-aad1-88acde24cd97',
        username: 'admin',
        password: password,
        isSuperUser: true,
        createdAt: formatDateForDatabase(),
        updatedAt: formatDateForDatabase()
      }], {}),
    ];
  },
  
  down: async (queryInterface, Sequelize) => [
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Constituencies', null, {}),
    await queryInterface.bulkDelete('SubCounties', null, {}),
    await queryInterface.bulkDelete('Parishes', null, {}),
    await queryInterface.bulkDelete('Villages', null, {}),
    await queryInterface.bulkDelete('Representatives', null, {}),
    await queryInterface.bulkDelete('Users', null, {})
  ]
};
