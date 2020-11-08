// Thêm nhân viên

var arrNhanVien = [];
document.querySelector('#btn__Luu').style.display = 'none';
document.querySelector("#btn__Them").onclick = function () {

    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector("#maNhanVien").value;


    nv.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nv.heSoChucVu = document.querySelector("#chucVu").value;
    nv.luongCoBan = document.querySelector("#luongCoBan").value;
    nv.gioLamTrongThang = document.querySelector("#gioLamTrongThang").value;
    var tagChucVu = document.querySelector("#chucVu");

    var arrOpts = tagChucVu.options;

    nv.chucVu = arrOpts[tagChucVu.selectedIndex].innerHTML;


    // Kiểm tra hợp lệ input
    // Kiểm tra rỗng
    var valid = true;
    var validate = new Validation();
    valid &= validate.kiemTraRong(nv.maNhanVien, 'mã Nhân Viên', '#kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'tên Nhân Viên', '#kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'lương Cơ Bản', '#kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.gioLamTrongThang, 'giờ làm trong tháng', '#kiemTraRong-gioLamTrongThang');

    // Mã nhân viên phải là số
    valid &= validate.kiemTraTatCaLaSo(nv.maNhanVien, 'mã nhân viên', '#kiemTraTatCaLaSo-maNhanVien');
    // Mã nhân có tối đa 4-6 kí số
    valid &= validate.kiemTraGiaTri(nv.maNhanVien, 'mã Nhân Viên', '#kiemTraGiaTri-maNhanVien', 0, 999999);

    // tên nhân viên phải là chữ
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'tên nhân viên', '#kiemTraTatCaKyTu-tenNhanVien');

    //Lương cơ bản 1 000 000 - 20 000 000 
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương Cơ Bản', '#kiemTraGiaTri-luongCoBan', 1000000, 20000000);
    //Số giờ làm trong tháng 50 - 150 giờ 
    valid &= validate.kiemTraGiaTri(nv.gioLamTrongThang, 'giờ làm trong tháng', '#kiemTraGiaTri-gioLamTrongThang', 50, 150);
    if (!valid) {
        return;
    }

    // lấy innerHTML của thẻ select



    arrNhanVien.push(nv);

    renderTable(arrNhanVien);
    luuLocalStorage();
}



var renderTable = function (mangNhanVien) {
    // duyệt mảng nhân viên rồi thêm html vào nếu nhân viên có tồn tại
    var noiDungTBody = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        var nhanVien = mangNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.gioLamTrongThang);
        noiDungTBody += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.gioLamTrongThang}</td>
            <td>${nv.xepLoaiNhanVien()}</td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
            <td><button class="btn btn-primary" onclick="chinhSuaNhanVien('${nv.maNhanVien}')">Chỉnh Sửa</button></td>
        </tr>
        `


    }
    document.querySelector("#table__data").innerHTML = noiDungTBody;
}

var luuLocalStorage = function () {
    // Lưu mảng nhân viên xuống local storage
    // biến mảng nhân viên thành string ( chuỗi)
    var sMnagNhanVien = JSON.stringify(arrNhanVien);
    // đem chuỗi mảng sinh viên lưu vào storage
    localStorage.setItem('arrNhanVien', sMnagNhanVien);
}

//viết phương thức lấy dữ liệu từ local storage khi người dùng vừa vào trang web
var layMangNhanVienStorage = function () {
    // Kiểm tra dữ liệu có trong local storage không
    if (localStorage.getItem('arrNhanVien')) {
        // lấy dữ liệu đc lưu trong local Storage
        var sMnagNhanVien = localStorage.getItem('arrNhanVien');
        // Biến dữ liệu từ chuỗi chuyển về object js gắn vào mang Nhan Vien
        arrNhanVien = JSON.parse(sMnagNhanVien);
        // Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        renderTable(arrNhanVien);
    }
}
layMangNhanVienStorage();

// Xóa nhân viên 
var xoaNhanVien = function (maNV) {
    // duyệt mảng nhân viên => tìm nhân viên có mã trùng => Xóa => rendertable => lưu xuống localstorage
    for (var i = arrNhanVien.length - 1; i >= 0; i--) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.maNhanVien === maNV) {
            arrNhanVien.splice(i, 1);
        }
    }
    renderTable(arrNhanVien);
    luuLocalStorage();
}

// Chỉnh Sửa Nhân Viên
var chinhSuaNhanVien = function (maNV) {
    document.querySelector('#btn__Them').style.display = 'none';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanvien = arrNhanVien[i];
        if (nhanvien.maNhanVien === maNV) {
            document.querySelector('#maNhanVien').value = nhanvien.maNhanVien;
            document.querySelector('#tenNhanVien').value = nhanvien.tenNhanVien;

            if(nhanvien.chucVu == "Giám Đốc"){
                document.querySelector('#chucVu').selectedIndex = 0;
            } else if( nhanvien.chucVu == "Quản lí"){
                document.querySelector('#chucVu').selectedIndex = 1;
            } else if( nhanvien.chucVu == 'Nhân Viên'){
                document.querySelector('#chucVu').selectedIndex = 2;
            }
            // var tagChucVu = document.querySelector('#chucVu');

            // var arrOpts = tagChucVu.options;

            // arrOpts[tagChucVu.selectedIndex].innerHTML = nhanvien.chucVu;

            document.querySelector('#luongCoBan').value = nhanvien.luongCoBan;
            document.querySelector('#gioLamTrongThang').value = nhanvien.gioLamTrongThang;
            document.querySelector('#maNhanVien').disabled = true;
            document.querySelector('#btn__Luu').style.display = 'inline-block';
            console.log(nhanvien.chucVu);
        }
    }
}
// Nhấn nút BTN lưu thông tin

document.querySelector('#btn__Luu').onclick = function () {
    var nhanvien = new NhanVien();
    nhanvien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanvien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    var tagChucVu = document.querySelector('#chucVu');

    var arrOpts = tagChucVu.options;

    nhanvien.chucVu = arrOpts[tagChucVu.selectedIndex].innerHTML;
    nhanvien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanvien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanvien.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;

    for (var i = 0; i < arrNhanVien.length; i++) {
        var nvCapNhat = arrNhanVien[i];
        if (nhanvien.maNhanVien === nvCapNhat.maNhanVien) {
            nvCapNhat.maNhanVien = nhanvien.maNhanVien;
            nvCapNhat.tenNhanVien = nhanvien.tenNhanVien;
            nvCapNhat.heSoChucVu = nhanvien.heSoChucVu;

            nvCapNhat.chucVu = nhanvien.chucVu;
            nvCapNhat.luongCoBan = nhanvien.luongCoBan;
            nvCapNhat.gioLamTrongThang = nhanvien.gioLamTrongThang;
        }
    }

    renderTable(arrNhanVien);
    luuLocalStorage();
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btn__Luu').style.display = 'none';
    document.querySelector('#btn__Them').style.display = 'inline-block';
    document.querySelector('#maNhanVien').value = '';
    document.querySelector('#tenNhanVien').value = '';
    document.querySelector('#chucVu').value = '';
    document.querySelector('#gioLamTrongThang').value = '';
    document.querySelector('#luongCoBan').value = '';

}
