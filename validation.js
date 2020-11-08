var Validation = function(){
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaKyTu = function (value,name,selectorError) { 
        var regexKyTu = /^[A-Za-z ]+$/;
        if(!regexKyTu.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự !';
            return false;
        } 
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }
    this.kiemTraTatCaLaSo = function (value,name,selectorError){
        var regexSo =  /^[0-9]+$/; 
        if(!regexSo.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số !';
            return false;
        } 
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }
    this.kiemTraGiaTri = function (value,name,selectorError,minValue,maxValue) { 
        if(Number(value)<minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ` từ ${minValue} đến ${maxValue} !`;
            return false;
        }
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }

    
}