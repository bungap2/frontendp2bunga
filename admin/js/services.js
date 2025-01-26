$(document).ready(function () {
    // Fetch service data from API
    $.ajax({
      url: "http://localhost:8000/index.php/service", // API endpoint untuk mengambil data service
      method: "GET",
      success: function (response) {
        let services = Array.isArray(response) ? response : JSON.parse(response);
        let servicesTable = $("#servicesData");
        servicesTable.empty();
    
        services.forEach(function (service, index) {
          let sequentialId = index + 1;
          let formattedPrice = formatRupiah(service.harga); // Menggunakan fungsi yang diperbaiki
    
          let row = `<tr>
          <td>${sequentialId}</td>
          <td>${service.nama_service}</td>
          <td>${formattedPrice}</td>
          <td>${service.deskripsi}</td>
          <td><img src="uploads/${service.foto}" alt="Service Image" width="100" height="100"></td>
          <td>
              <a href="edit_service.html?id=${service.id}" class="btn btn-primary btn-sm">Edit</a>
              <a href="#" class="btn btn-danger btn-sm" onclick="deleteService(${service.id})">Delete</a>
          </td>
        </tr>`;
          servicesTable.append(row);
        });
      },
      error: function () {
        alert("Failed to fetch service data.");
      },
    });
  });
  
  // Function to format number to Rupiah
  function formatRupiah(angka) {
    let number = typeof angka === "number" ? angka : parseFloat(angka);
    return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }
  
  // Function to confirm deletion and delete service
  function deleteService(serviceId) {
    if (confirm("Are you sure you want to delete this service?")) {
      $.ajax({
        url: `http://localhost:8000/index.php/service/${serviceId}`,
        method: "DELETE",
        success: function () {
          alert("Service deleted successfully!");
          location.reload();
        },
        error: function () {
          alert("Failed to delete service.");
        },
      });
    }
  }
  