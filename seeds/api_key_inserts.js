
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('api_key').del()
    .then(function () {
      // Inserts seed entries
      return knex('api_key').insert([
        {token: 'fd686b53258e08d39b372d6e663bc6f402fd1b772',
         label: 'Admin',
         status:'YES',
         type:'WRITE',
         trusted: 'YES'},
      ]);
    });
};
