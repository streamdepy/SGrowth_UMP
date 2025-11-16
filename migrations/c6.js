"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("peminjamans", {
      id_peminjaman: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_anggota: {
        type: Sequelize.INTEGER,
      },
      id_admin: {
        type: Sequelize.INTEGER,
      },
      tanggal_pengajuan: {
        type: Sequelize.DATE,
      },
      durasi_peminjaman: {
        type: Sequelize.INTEGER,
      },
      durasi_perpanjangan: {
        type: Sequelize.INTEGER,
      },
      tanggal_jatuh_tempo: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("peminjamans");
  },
};
