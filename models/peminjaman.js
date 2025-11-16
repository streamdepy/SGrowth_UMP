"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Peminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Peminjaman.init(
    {
      id_anggota: DataTypes.INTEGER,
      id_admin: DataTypes.INTEGER,
      tanggal_pengajuan: DataTypes.DATE,
      durasi_peminjaman: DataTypes.INTEGER, 
      durasi_perpanjangan: DataTypes.INTEGER,
      tanggal_jatuh_tempo: DataTypes.DATE, 
    },
    {
      sequelize,
      tableName: "peminjamans",
      modelName: "Peminjaman",
      // updatedAt: "updated_at",
      // createdAt: "created_at",
    }
  );
  return Peminjaman;
};
