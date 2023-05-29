var ingresosTotales = 0;
var gastosTotales = 0;

function agregarRegistro() {
  var concepto = document.getElementById("concepto").value;
  var monto = parseFloat(document.getElementById("monto").value);
  var categoria = document.getElementById("categoria").value;

  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var año = fecha.getFullYear();
  var fechaRegistro = dia + "/" + mes + "/" + año;

  var table = document.querySelector("table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = fechaRegistro;
  cell2.innerHTML = concepto;
  cell3.innerHTML = monto.toFixed(2);
  cell4.innerHTML = categoria;
  cell5.innerHTML = '<button class="delete-btn" onclick="eliminarRegistro(this)">Eliminar</button>';

  if (categoria === "ingreso") {
    ingresosTotales += monto;
  } else if (categoria === "gasto") {
    gastosTotales += monto;
  }

  document.getElementById("concepto").value = "";
  document.getElementById("monto").value = "";

  actualizarResumen();
}

function eliminarRegistro(button) {
  var row = button.parentNode.parentNode;
  var monto = parseFloat(row.cells[2].innerHTML);

  if (row.cells[3].innerHTML === "ingreso") {
    ingresosTotales -= monto;
  } else if (row.cells[3].innerHTML === "gasto") {
    gastosTotales -= monto;
  }

  row.parentNode.removeChild(row);

  actualizarResumen();
}

function actualizarResumen() {
  document.getElementById("total-ingresos").textContent = ingresosTotales.toFixed(2);
  document.getElementById("total-gastos").textContent = gastosTotales.toFixed(2);
  document.getElementById("saldo").textContent = (ingresosTotales - gastosTotales).toFixed(2);
}

var ingresosTotales = 0;
var gastosTotales = 0;

// Cargar registros guardados en el almacenamiento local al cargar la página
window.addEventListener('load', function() {
  cargarRegistros();
});

function agregarRegistro() {
  var concepto = document.getElementById("concepto").value;
  var monto = parseFloat(document.getElementById("monto").value);
  var categoria = document.getElementById("categoria").value;

  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var año = fecha.getFullYear();
  var fechaRegistro = dia + "/" + mes + "/" + año;

  var table = document.querySelector("table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = fechaRegistro;
  cell2.innerHTML = concepto;
  cell3.innerHTML = monto.toFixed(2);
  cell4.innerHTML = categoria;
  cell5.innerHTML = '<button class="delete-btn" onclick="eliminarRegistro(this)">Eliminar</button>';

  if (categoria === "ingreso") {
    ingresosTotales += monto;
  } else if (categoria === "gasto") {
    gastosTotales += monto;
  }

  guardarRegistros();
  actualizarResumen();

  document.getElementById("concepto").value = "";
  document.getElementById("monto").value = "";
}

function eliminarRegistro(button) {
  var row = button.parentNode.parentNode;
  var monto = parseFloat(row.cells[2].innerHTML);

  if (row.cells[3].innerHTML === "ingreso") {
    ingresosTotales -= monto;
  } else if (row.cells[3].innerHTML === "gasto") {
    gastosTotales -= monto;
  }

  row.parentNode.removeChild(row);

  guardarRegistros();
  actualizarResumen();
}

function guardarRegistros() {
  var registros = [];

  var table = document.querySelector("table");
  var rows = table.rows;

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var fecha = row.cells[0].innerHTML;
    var concepto = row.cells[1].innerHTML;
    var monto = parseFloat(row.cells[2].innerHTML);
    var categoria = row.cells[3].innerHTML;

    registros.push({
      fecha: fecha,
      concepto: concepto,
      monto: monto,
      categoria: categoria
    });
  }

  localStorage.setItem("registros", JSON.stringify(registros));
}

function cargarRegistros() {
  var registros = localStorage.getItem("registros");

  if (registros) {
    registros = JSON.parse(registros);

    var table = document.querySelector("table");

    for (var i = 0; i < registros.length; i++) {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML = registros[i].fecha;
      cell2.innerHTML = registros[i].concepto;
      cell3.innerHTML = registros[i].monto.toFixed(2);
      cell4.innerHTML = registros[i].categoria;
      cell5.innerHTML = '<button class="delete-btn" onclick="eliminarRegistro(this)">Eliminar</button>';

      if (registros[i].categoria === "ingreso") {
        ingresosTotales += registros[i].monto;
      } else if (registros[i].categoria === "gasto") {
        gastosTotales += registros[i].monto;
      }
    }

    actualizarResumen();
  }
}
