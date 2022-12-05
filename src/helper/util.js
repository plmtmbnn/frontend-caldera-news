const moment = require("moment");

const util = {
  indonesiaFormat: ( x, showHari ) => {
    let hari = moment(x).add('-1','day').day();
    switch(hari) {
      case 0: hari = "Minggu"; break;
      case 1: hari = "Senin"; break;
      case 2: hari = "Selasa"; break;
      case 3: hari = "Rabu"; break;
      case 4: hari = "Kamis"; break;
      case 5: hari = "Jumat"; break;
      case 6: hari = "Sabtu"; break;
      default: hari = "Minggu"; break;
     }

     let bulan = moment(x).add('-1','day').month();
     switch(bulan) {
      case 0: bulan = "Januari"; break;
      case 1: bulan = "Februari"; break;
      case 2: bulan = "Maret"; break;
      case 3: bulan = "April"; break;
      case 4: bulan = "Mei"; break;
      case 5: bulan = "Juni"; break;
      case 6: bulan = "Juli"; break;
      case 7: bulan = "Agustus"; break;
      case 8: bulan = "September"; break;
      case 9: bulan = "Oktober"; break;
      case 10: bulan = "November"; break;
      case 11: bulan = "Desember"; break;
      default: bulan = "Desember"; break;
     }

    return `${showHari ? '':`${hari},`} ${moment(x).add('-1','day').format('DD')} ${bulan} ${moment(x).add('-1','day').add('6', 'hour').format('YYYY HH:mm')} WIB`;
  }
};

export default util;
