var NhanVien = function(manv, tennv, chucvu, hesochucvu, luongcb, giolamtrongthang){
    this.maNhanVien= manv;
    this.tenNhanVien= tennv;
    this.chucVu= chucvu;
    this.heSoChucVu = hesochucvu;
    this.luongCoBan= luongcb;
    this.gioLamTrongThang= giolamtrongthang;
    this.tinhTongLuong = function(){
        if( this.heSoChucVu == 3 ){
            return this.luongCoBan*3;
        } else if ( this.heSoChucVu == 2){
            return this.luongCoBan*2;
        } else {
            return this.luongCoBan;
        }
    }

    this.xepLoaiNhanVien = function(){
        if( this.gioLamTrongThang > 120){
            return "Xuat Sac";
        } else if ( this.gioLamTrongThang >100){
            return "Gioi";
        } else if( this.gioLamTrongThang > 80){
            return "Kha";
        } else if( this.gioLamTrongThang > 50){
            return "Trung Binh";
        } else{
            return "Khong Xac dinh";
        }
    }
}