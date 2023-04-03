"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        timestamp: false,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team_id",
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        timestamp: false,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
