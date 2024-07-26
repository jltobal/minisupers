document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-contacto');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const consulta = document.getElementById('consulta').value;

        const contactoCompleto = [
            `Nombre: ${nombre}`,
            `Apellido: ${apellido}`,
            `Email: ${email}`,
            `Teléfono: ${telefono}`,
            `Consulta: ${consulta}`
        ];

        const textoContacto = contactoCompleto.join('\n');
        const blob = new Blob([textoContacto], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'contacto.txt'; 

        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        form.reset();

        alert('Datos enviados y archivo de texto descargado');
    });
});
