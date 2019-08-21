module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '.super.',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
