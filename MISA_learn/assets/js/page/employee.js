$(document).ready(function(){
    formMode =  null;
    employeeIdSelected = null;
    loadData();
    //Thực hiện gán các evens cho các element
    $('#btnAddEmployee').click(function () { 
        formMode = 'add';
        // Hiển thị form chi tiết nhân viên
        $("#js-dialog").show();
        $("input").val(null);
    });
    //Lấy mã nhân viên mới hiển thị lên ô nhập
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
        success: function (response) {
            $('#txtEmployeeCode').val(response);

            // Focus vào ô nhập dữ liệu đầu tiên
            $('#txtEmployeeCode').focus();
        }
    });


    //Lưu thông tin
    $("#js-btnSave").click(function () { 
        // Thu thập các thông tin đã liệu:
        const employeeCode = $('#txtEmployeeCode').val();
        const fullName = $('#txtFullName').val();
        const genderName = $('#cbGenderName').val();
        const dateOjBirth = $('#dtDateOfBirth').val();
        const phoneNumber = $('#txtPhoneNumber').val();
        const email = $('#txtEmail').val();
        const positionName = $('#cbPositionName').val();
        const departmentName = $('#cbDepartmentName').val();
        const salary = $('#txtSalary').val();
        const address = $('#txtAddress').val();
        // Buil thành object nhân viên:
        let employee = 
        {
            "EmployeeCode": employeeCode,
            "FullName": fullName,
            // "Gender": 0,
            "DateOfBirth": dateOjBirth,
            "PhoneNumber": phoneNumber,
            "Email": email,
            "Address": address,
            // "DepartmentId": "142cb08f-7c31-21fa-8e90-67245e8b283e",
            // "PositionId": null,
            "Salary": salary
            // "PositionName": null,
            // "DepartmentName": "Phòng Marketting",
            // "GenderName": "Nữ",
        }
        if(formMode == "add"){
            $.ajax({
                type: "POST",
                url: "http://cukcuk.manhnv.net/api/v1/Employees",
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                }
            });

        }else{
            $.ajax({
                type: "PUT",
                url: `http://cukcuk.manhnv.net/api/v1/Employees/${employeeIdSelected}`,
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                }
            });
        }

        // Sử dụng ajax gọi lại lên API cất dữ liệu
        //Ẩn form chi tiết
        $("#js-dialog").hide();
        //Load lại data 
        loadData();
    });


    $('#js-dialog__close').click(function () { 
        $("#js-dialog").hide();
    });
    $('#js-dialog-cancel').click(function () { 
        $("#js-dialog").hide();
    });




    $('#tableEmployee').on('dblclick', 'tbody tr', rowOnDBClick);

    $('#tableEmployee').on('click', 'tbody tr', function(){
        $(this).siblings().removeClass('row-selected');
        $(this).addClass('row-selected');
    });

    $('#btnDelete').on('click', 'tbody tr', function(){
        $.ajax({
            type: "DELETE",
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${employeeIdSelected}`,
            success: function (response) {
                console.log(response);
            }
        });
    });
});

function rowOnDBClick(sender){
    formMode = "edit";
    //lấy id của nhân viên tương ứng
    var employeeId = $(this).data("employeeId");
    employeeIdSelected = employeeId;
    //Lấy thông tin chi tiết của nhân viên
    $.ajax({
        type: "GET",
        url: `http://cukcuk.manhnv.net/api/v1/Employees/${employeeId}`,
        success: function (emp) {
            // Binding dữ liệu lên form chi tiết tương ứng với từng thông tin đối tuongwj
            $('#txtEmployeeCode').val(emp.EmployeeCode);
            $('#txtFullName').val(emp.FullName);
            // $('#cbGenderName').val();
            $('#dtDateOfBirth').val(emp.DateOfBirth);
            $('#txtPhoneNumber').val(emp.PhoneNumber);
            $('#txtEmail').val(emp.Email);
            // $('#cbPositionName').val();
            // $('#cbDepartmentName').val();
            $('#txtSalary').val(emp.Salary);
            $('#txtAddress').val(emp.Address);
            // Hiển thi form thông tin chi tiết
            $("#js-dialog").show();
        }
    });
    // Binding dữ liệu lên form chi tiết tương ứng với từng thông tin đối tuongwj

    // Hiển thi form thông tin chi tiết
}

/**
 * Load combobox phòng ban
 */
function loadDepartmentComboboxData(){
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/api/v1/Departments",
        success: function (response) {
            for (const department of response) {
                let optionHTML =`<option value="${department.DepartmentID}">${department.departmentName}</option>`
            }
        }
    });
}

async function loadData(){
    //Làm trống dữ liệu hiển thị
    $('tbody').empty();

    //lấy dữ liệu
    let employees = [];

    // Sử dụng fetch trong js
    // await fetch('http://cukcuk.manhnv.net/api/v1/Employees')
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         employees = data;
    //         console.log(data);
    //     })
    //     .catch(res => {})


    // Sử dụng ajax :
    $.ajax({
        type: "GET", // GET - lấy dữ liệu; POST - Thêm mới dữ liệu; PUT - sửa; DELETE - Xóa
        url: "http://cukcuk.manhnv.net/api/v1/Employees",
        data: "data", // Tham số truyền lên cho API nếu có
        async: false,
        dataType: "json",
        success: function (response) {
            employees = response;
        },
        error: function(res){
            console.log("Lỗi API");
        }
        
    });
    //Xử lý dữ liệu

    //build dữ liệu và hiển thị dữ liệu lên table

    
    // Mapping tttg tin của từng đối tượng trong mảng vào chuỗi HTML
    for (const emp of employees) {
        //Xử lý dữ liệu

        //1. Xử lý dữ liệu ngày tháng năm 
        let dateOfBirth = new Date(emp.DateOfBirth);
        let date = dateOfBirth.getDate();
        let month = dateOfBirth.getMonth() + 1;
        let year = dateOfBirth.getFullYear();
        //bổ sung '0' nếu ngày hoăc tháng nhỏ hơn 10 
        date = (date < 10) ? `0${date}` : date;
        month = (month < 10) ? `0${month}` : month;
        dateOfBirth  = `${date}-${month}-${year}`;

        //2.Định dạng tiền tệ
        // let salary = emp.Salary.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        let salary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(emp.Salary);

        //Xác định thông tin khách hàng được thể hiện như thế nào
        let trHTML = $(`<tr>
                <td class="text-align-left">${emp.EmployeeCode}</td>
                <td class="text-align-left">${emp.FullName}</td>
                <td class="text-align-left">${emp.GenderName}</td>
                <td class="text-align-center" style="width: 100px">${dateOfBirth}</td>
                <td class="text-align-left">${emp.PhoneNumber}</td>
                <td class="text-align-left">${emp.Email}</td>
                <td class="text-align-left">${emp.PositionName}</td>
                <td class="text-align-left">${emp.DepartmentName}</td>
                <td class="text-align-left">${emp.Address}</td>
                <td class="text-align-right">${salary}</td>
            </tr>`);
        trHTML.data("employeeId", emp.EmployeeId); 
        
        $('tbody').append(trHTML);
    }
}

