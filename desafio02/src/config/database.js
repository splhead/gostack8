module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '.super.',
  database: 'meetapp',
  define: {
    timestamps: true,
    underscored: true, // muda o nome das tabelas
    underscoredAll: true, // muda o nome dos campos
  },
};
