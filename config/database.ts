import { Sequelize } from "sequelize";

const sequelize = new Sequelize('tourdb', 'root', '12345678', {
   host: 'localhost',
   dialect: 'mysql',
});


  
  sequelize.authenticate().then(() => {
     console.log('Kết nối DB thành công.');
  }).catch((error) => {
     console.error('Kết nối DB thất bại: ', error);
  });



  export default sequelize;